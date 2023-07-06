import React, { useState } from 'react';

import { localPoint } from '@visx/event';
import { Group } from '@visx/group';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { scaleOrdinal } from '@visx/scale';
import { Pie as VisxPie } from '@visx/shape';
import { Tooltip as VisxTooltip, defaultStyles, withTooltip } from '@visx/tooltip';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';

import { colorToRGBA } from '../../utils/color';

const margin = 20;
const legendGlyphSize = 15;
const colorOpacity = 0.4;

interface PieData {
  key: string;
  label: string;
  value: number;
  color: string;
}

type PieProps = {
  data: Array<PieData>;
  totalCount: number;
  totalLabel: string;
};

export default withTooltip<PieProps, PieData>((props) => {
  const { data, totalCount, totalLabel, tooltipOpen, tooltipData, tooltipLeft, tooltipTop, showTooltip, hideTooltip } = props;

  const ordinalColorScale = scaleOrdinal({
    domain: data.map((d) => d.label),
    range: data.map((d) => d.color),
  });

  const theme = useTheme();

  const [active, setActive] = useState<PieData | null>(null);

  let tooltipTimeout: number;

  return (
    <ParentSize>
      {({ width, height }) => {
        const innerWidth = width - margin * 2;
        const innerHeight = height - margin * 2;
        const radius = Math.min(innerWidth, innerHeight) / 2;

        const centerY = innerHeight / 2;
        const centerX = innerWidth / 2;
        const top = centerY + margin;
        const left = centerX + margin;

        return (
          <>
            <svg width={width} height={height}>
              <Group top={top} left={left}>
                <VisxPie
                  data={data}
                  pieValue={(d) => d.value}
                  outerRadius={(d) => {
                    const offset = active && active.label === d.data.label ? 5 : 10;
                    return radius - offset;
                  }}
                  innerRadius={(d) => {
                    const offset = active && active.label === d.data.label ? 55 : 50;
                    return radius - offset;
                  }}
                  cornerRadius={3}
                  startAngle={0}
                  padAngle={0.05}
                >
                  {(pie) => {
                    return pie.arcs.map((a) => {
                      const { key, color } = a.data;
                      const arcPath = pie.path(a) || '';
                      return (
                        <g
                          style={{ cursor: 'pointer' }}
                          key={`arc-${key}`}
                          onMouseEnter={(_) => {
                            if (tooltipTimeout) clearTimeout(tooltipTimeout);
                            setActive(a.data);
                          }}
                          onMouseMove={(event) => {
                            const eventSvgCoords = localPoint(event);
                            showTooltip({
                              tooltipData: a.data,
                              tooltipTop: eventSvgCoords?.y,
                              tooltipLeft: eventSvgCoords?.x,
                            });
                          }}
                          onMouseLeave={(_) => {
                            tooltipTimeout = window.setTimeout(() => {
                              hideTooltip();
                              setActive(null);
                            }, 100);
                          }}
                        >
                          <path d={arcPath} fill={colorToRGBA(color, colorOpacity)} stroke={color} strokeWidth={2} />
                        </g>
                      );
                    });
                  }}
                </VisxPie>

                <>
                  <text textAnchor="middle" fontSize={32} y={-20}>
                    {totalCount}
                  </text>
                  <text fontSize={25} textAnchor="middle" y={20}>
                    {totalLabel}
                  </text>
                </>
              </Group>
            </svg>
            <Box sx={{ position: 'relative', bottom: '30px' }}>
              <LegendOrdinal scale={ordinalColorScale}>
                {(labels) => (
                  <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    {labels.map((label) => (
                      <LegendItem key={`legend-quantile-${label.index}`} margin="0 5px">
                        <svg width={legendGlyphSize} height={legendGlyphSize}>
                          <rect fill={colorToRGBA(label.value || '', colorOpacity)} width={legendGlyphSize} height={legendGlyphSize} />
                        </svg>
                        <LegendLabel align="left" margin="0 0 0 4px">
                          {label.text}
                        </LegendLabel>
                      </LegendItem>
                    ))}
                  </Box>
                )}
              </LegendOrdinal>
            </Box>
            {tooltipOpen && tooltipData && (
              <VisxTooltip
                top={tooltipTop}
                left={tooltipLeft}
                style={{
                  ...defaultStyles,
                  background: theme.chartsTooltip.background,
                  color: theme.chartsTooltip.color,
                  boxShadow: theme.shadows[5],
                }}
              >
                <Stack direction="row" spacing={0.5}>
                  <svg width={legendGlyphSize} height={legendGlyphSize}>
                    <rect fill={colorToRGBA(tooltipData.color || '', colorOpacity)} width={legendGlyphSize} height={legendGlyphSize} />
                  </svg>
                  <span>{tooltipData.label}</span> :<strong>{tooltipData.value}</strong>
                </Stack>
              </VisxTooltip>
            )}
          </>
        );
      }}
    </ParentSize>
  );
});
