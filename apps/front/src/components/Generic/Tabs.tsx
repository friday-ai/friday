import React, { useState } from 'react';

interface TabsProps {
  defaultTab: string;
  children: JSX.Element | JSX.Element[];
}

function Tabs({ defaultTab, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [childs] = useState(Array.isArray(children) ? children.filter(Boolean) : children);

  return (
    <div>
      {childs && (
        <>
          <div className="tabs">
            {React.Children.map(childs, (child) => {
              const label = child.props['data-label'];

              return (
                <button type="button" className={`tab tab-lifted ${activeTab === label && 'tab-active'}`} onClick={() => setActiveTab(label)}>
                  {label}
                </button>
              );
            })}
            <span className="tab tab-lifted xl:tab-lg flex-grow cursor-default" />
          </div>
          <div className="bg-base-100 border-x border-b border-base-300 p-4 rounded-btn rounded-t-[0]">
            {React.Children.map(childs, (child) => {
              const label = child.props['data-label'];
              return label === activeTab && child;
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Tabs;
