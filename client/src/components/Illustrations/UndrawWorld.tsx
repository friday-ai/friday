import React from 'react';
import { SVGProps } from '../../utils/interfaces';
import { useAppSelector } from '../../services/store/store';
import { themeColors } from '../App/app.reducer';

const UndrawWorld: React.FC<SVGProps> = ({ className = '', height = '400', width = '400' }) => {
  const colors = useAppSelector(themeColors);
  return (
    <svg
      id="f2ef7d3c-3379-45e6-8007-6e6f16c2d34b"
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 400.00001 400.00001"
    >
      <defs id="defs118" />
      <path
        d="m 330.98689,224.8051 a 113.45516,113.45516 0 1 1 -7.18311,-39.95154 c 0.24738,0.66626 0.48859,1.33246 0.72333,2.00516 v 0.006 q 1.57068,4.43545 2.76672,9.03607 a 114.22515,114.22515 0 0 1 3.69306,28.90396 z"
        fill="#3f3d56"
        id="path26"
      />
      <path
        d="m 204.27061,147.74242 a 38.323,38.323 0 0 0 -33.64392,-1.37646 c -4.704,2.04721 -9.65717,5.71963 -11.22644,12.35137 6.34668,-3.7456 14.56237,2.17243 16.19549,11.66614 l -0.38122,0.10514 c -0.86261,6.57574 1.063,13.735 4.79107,17.81237 a 12.528,12.528 0 0 1 6.01337,-8.91839 c 2.73907,-1.8006 5.76929,-3.10861 7.86,-6.20362 2.47852,-3.66922 3.10791,-9.03167 4.09247,-13.92361 0.98456,-4.89194 2.85258,-10.14984 6.29918,-11.51294 z"
        fill="#14255b"
        id="path28"
      />
      <path
        d="m 168.74406,203.6998 c -1.75769,2.63974 -4.10553,4.296 -6.21222,6.35827 a 14.301,14.301 0 0 0 -4.518,8.4459 c -0.26654,2.29708 0.14588,4.63217 0.0888,6.95474 -0.057,2.32242 -0.83124,4.93677 -2.41126,5.51422 -2.49383,0.901 -4.39752,-3.73117 -6.961,-4.05481 -2.037,-0.25382 -3.87079,2.95071 -3.2807,5.73007 0.59009,2.77936 3.36316,4.01032 4.95587,2.19553 1.44043,2.4176 0.42511,6.80249 -1.7387,7.54483 -0.22852,1.52292 -0.45685,3.03952 -0.679,4.56244 -5.46985,-3.82639 -10.99683,-7.71613 -15.64807,-13.31931 a 40.42889,40.42889 0 0 1 -9.21375,-21.77786 c -0.60284,-6.44074 0.29187,-13.80792 -2.665,-18.7637 -2.367,-3.966 -6.42816,-4.84174 -10.08319,-4.59421 -0.66626,0.0443 -1.3388,0.12051 -2.00518,0.203 a 112.96626,112.96626 0 0 1 8.17932,-18.71936 8.01392,8.01392 0 0 0 2.04956,-1.27554 c 3.40124,-2.88715 4.91156,-8.73148 7.67175,-12.77359 q 0.2666,-0.39024 0.55206,-0.76142 c 2.82386,-3.68679 6.60572,-5.5841 10.26075,-7.3482 8.09057,-3.92786 16.41583,-7.9065 24.957,-7.36081 l -2.43036,0.2348 q -4.25464,11.91692 -8.51575,23.83393 -0.64728,1.82739 -1.30713,3.66137 c -1.61182,4.518 -3.27435,9.32794 -3.02679,14.38535 0.146,2.995 1.18658,6.19327 3.16638,7.22122 1.84656,0.95184 3.86444,-0.21579 5.64746,-1.37067 0.75519,-0.48224 1.504,-0.96457 2.259,-1.45318 2.70954,-1.745 5.711,-3.53446 8.57282,-2.36692 2.62072,1.066 4.55609,4.62595 4.92413,8.465 a 16.9235,16.9235 0 0 1 -2.58875,10.62891 z"
        fill="#14255b"
        id="path30"
      />
      <path
        d="m 184.85911,257.93969 q -11.87028,-7.30866 -23.7406,-14.61731 l 0.13427,-0.346 c -4.92022,1.874 -6.963,10.62 -6.14984,17.77243 0.81316,7.15243 3.57032,13.5462 4.9632,20.51526 a 54.45375,54.45375 0 0 1 -2.053,28.57345 234.0033,234.0033 0 0 0 27.489,-37.87884 20.26462,20.26462 0 0 0 2.48652,-5.51355 8.77124,8.77124 0 0 0 -0.58136,-6.23844 6.94574,6.94574 0 0 0 -2.54819,-2.267 z"
        fill="#14255b"
        id="path32"
      />
      <path
        d="m 153.62717,169.29543 a 8.75071,8.75071 0 0 0 -0.401,6.36352 7.0537,7.0537 0 0 0 3.94092,3.65 l 4.37256,2.16739 c 1.45465,0.72107 3.02264,1.44931 4.50549,0.85605 1.78858,-0.71552 3.02869,-3.5196 2.70795,-6.12275 -0.34149,-2.77014 -2.08752,-4.67556 -3.70245,-6.29818 q -3.38992,-3.40614 -6.77973,-6.81226 l -1.27362,1.55994 a 17.009,17.009 0 0 0 -3.37012,4.63629 z"
        fill="#14255b"
        id="path34"
      />
      <path
        d="m 307.54649,198.90892 q 2.95083,0.69484 5.90142,1.38959 c -0.34271,6.64386 -3.636,12.79273 -8.05249,15.01993 -1.84021,0.92651 -3.88983,1.2691 -5.41278,3.00149 -1.37695,1.5737 -2.075,4.023 -2.71594,6.36451 q -1.68466,6.12986 -3.36951,12.25955 c -1.20556,4.40381 -2.7539,9.29632 -5.88861,10.88269 -2.69049,1.3642 -5.76812,-0.30466 -7.83667,-3.103 -2.06866,-2.79831 -3.33142,-6.56125 -4.55615,-10.22891 0.0762,3.99768 -1.783,7.91925 -4.4165,9.30884 -2.63971,1.38959 -5.85065,0.13324 -7.61463,-2.96967 -1.2691,-2.22729 -1.79577,-5.16534 -3.03955,-7.42431 -1.24371,-2.259 -3.85168,-3.55347 -5.20965,-1.43409 -0.89478,1.40879 -0.78058,3.5662 -1.22474,5.35566 a 5.81555,5.81555 0 0 1 -4.86059,4.67666 8.10531,8.10531 0 0 1 -5.81891,-2.65884 26.35858,26.35858 0 0 1 -7.2276,-14.57566 17.38775,17.38775 0 0 1 0.20313,-7.97 c 0.78045,-2.46832 2.665,-4.37191 4.537,-3.90246 1.231,-2.60178 -1.19922,-6.05368 -3.38849,-5.74909 -2.19561,0.3046 -3.91522,2.65879 -5.71734,4.46726 -1.79578,1.80847 -4.30854,3.122 -6.11713,1.32617 a 2.48135,2.48135 0 0 1 -2.32416,2.62915 q -0.0975,0.006 -0.195,0.004 a 8.9977,8.9977 0 0 1 -3.28064,-1.73867 c -4.14362,-2.58268 -9.40418,-0.86933 -12.34845,4.01669 1.84021,-7.83042 4.537,-16.81571 10.19085,-18.656 2.30988,-0.75509 4.829,-0.13324 7.01191,-1.44046 3.8645,-2.316 4.645,-11.06662 1.30719,-14.67715 0.42511,3.41385 0.34271,7.39886 -1.45948,9.73407 -1.80212,2.3352 -5.5841,0.81216 -5.35559,-2.63974 a 2.31257,2.31257 0 0 1 -4.30224,0.91373 c -1.19928,-1.82746 -1.09772,-4.8162 -0.24744,-6.99909 a 16.48674,16.48674 0 0 1 3.6994,-5.25409 c 3.01416,-3.22983 6.07269,-6.4978 9.56281,-8.52844 3.4964,-2.03055 7.53216,-2.71585 11.03485,-0.69794 1.84668,1.066 3.47107,2.84281 5.35565,3.78189 a 3.96875,3.96875 0 0 0 5.46484,-1.27978 l 6e-5,-6e-5 q 0.0319,-0.0512 0.0621,-0.10355 c 1.40234,-2.4621 0.74237,-6.1171 1.26275,-9.19464 0.93274,-5.43808 6.37085,-7.98267 9.385,-4.39114 -2.25262,-0.5774 -4.58148,2.0877 -4.86065,5.31765 -0.28553,3.22983 1.34533,6.49149 3.52813,7.46869 3.66773,1.62439 7.25928,-2.46216 10.03235,-6.24405 q 4.34025,-5.93943 8.69336,-11.87246 a 14.347,14.347 0 0 1 1.55457,-1.891 5.0024,5.0024 0 0 1 6.83417,-0.13955 c 2.93164,2.39221 4.30859,7.29739 6.71362,10.67315 3.49,4.90509 8.71246,6.09806 13.573,7.0499 q 5.43484,1.05657 10.8764,2.12573 a 112.69,112.69 0 0 1 6.31378,13.94123 38.21131,38.21131 0 0 0 -16.25745,14.05531 z"
        fill="#14255b"
        id="path36"
      />
      <path
        d="m 319.26041,275.25856 a 113.76078,113.76078 0 0 1 -9.45489,15.81937 c -2.28436,-0.97723 -4.74011,0.76776 -6.87854,2.405 -2.23364,1.71332 -4.91785,3.3822 -7.20856,1.82117 -2.34143,-1.59906 -3.09662,-6.07264 -2.35419,-9.61988 a 25.632,25.632 0 0 1 4.39112,-9.03607 c 1.90368,-2.8428 3.94049,-5.79349 6.58667,-6.89761 2.65246,-1.1041 6.06,0.45685 6.83417,4.22616 l 1.87829,-0.0635 c -1.0534,-1.44675 -0.50128,-4.44187 0.91382,-4.96854 1.63074,-0.61548 3.0459,1.62439 4.01031,3.60431 0.43152,0.89465 0.86928,1.79583 1.2818,2.70959 z"
        fill="#14255b"
        id="path38"
      />
      <path
        d="m 247.32371,248.45543 c -4.03723,0.25388 -7.23517,-4.71615 -9.36023,-9.60559 -2.12506,-4.88944 -4.064,-10.48083 -7.70685,-12.96957 -2.08148,-1.42209 -4.45453,-1.61716 -6.71222,-2.30631 a 8.311,8.311 0 0 1 -5.70019,-5.01864 l -2.561,-1.03452 a 38.46146,38.46146 0 0 0 -9.72339,6.93308 21.732,21.732 0 0 0 -5.79388,12.6665 c -0.4892,5.12613 1.31732,10.84207 4.69281,12.7677 2.66717,1.52161 5.77252,0.56253 8.47412,1.95548 3.37555,1.74029 5.37952,6.79589 6.13812,11.78759 0.7586,4.9917 0.56635,10.17923 1.10907,15.2276 0.54272,5.04837 2.03851,10.30133 5.1341,12.88843 3.87371,3.23743 9.55792,0.5473 11.29583,-5.346 0.85248,-2.89068 0.82312,-6.15259 1.46082,-9.15329 1.1228,-5.28439 4.15283,-9.205 6.556,-13.53976 2.40317,-4.33476 4.29521,-10.222 2.69689,-15.2527 z"
        fill="#14255b"
        id="path40"
      />
      <path
        d="m 207.42973,196.52892 a 10.77266,10.77266 0 0 1 1.05133,1.11609 3.66683,3.66683 0 0 1 -0.0645,3.7865 3.5227,3.5227 0 0 0 2.52277,-1.2822 16.21376,16.21376 0 0 0 1.93426,-2.7247 2.96967,2.96967 0 0 0 0.57032,-2.37677 c -0.19074,-0.54431 -0.64173,-0.77646 -0.95789,-1.18582 a 8.05816,8.05816 0 0 1 -0.88477,-2.56986 4.635,4.635 0 0 0 -3.359,-3.53991 l 0.20233,0.0387 a 1.91908,1.91908 0 0 0 -0.89893,2.04431 c 0.12256,0.79184 0.63135,1.44925 0.58075,2.25687 -0.0728,1.16132 -1.2334,1.70627 -1.30511,2.86774 a 2.2171,2.2171 0 0 0 0.60846,1.56906 z"
        fill="#14255b"
        id="path42"
      />
      <path d="m 200.51261,176.79412 0.018,-0.004 a 3.24231,3.24231 0 0 0 0.34448,-0.367 z" fill="#14255b" id="path44" />
      <path
        d="m 201.72337,182.2452 a 3.52068,3.52068 0 0 0 1.096,-3.49018 c -0.29327,-1.32046 -1.33129,-2.20828 -2.28875,-1.96441 a 2.33283,2.33283 0 0 1 -2.16907,0.63861 c -0.59192,-0.15241 -1.24182,-0.54489 -1.75525,-0.0988 a 2.65738,2.65738 0 0 0 -0.59784,1.16739 q -0.285,0.87506 -0.57013,1.74988 a 1.10427,1.10427 0 0 0 -0.0674,0.66311 0.56171,0.56171 0 0 0 0.43078,0.3425 l 3.42041,1.00833 a 2.9468,2.9468 0 0 0 2.50123,-0.0164 z"
        fill="#14255b"
        id="path46"
      />
      <path
        d="m 287.79539,257.50273 q -0.79047,-1.29432 -1.58106,-2.58859 a 8.64807,8.64807 0 0 0 -2.08343,-2.616 1.84606,1.84606 0 0 0 -2.60059,0.22962 l -6e-5,6e-5 -0.0275,0.0336 0.0642,0.49286 a 11.13059,11.13059 0 0 1 2.777,5.4183 c 0.12012,0.88181 0.0784,1.79444 0.18371,2.68015 a 3.12568,3.12568 0 0 0 0.97645,2.186 c 0.82989,0.55439 1.80432,-0.263 2.39495,-1.26046 a 4.3404,4.3404 0 0 0 0.67243,-2.76267 4.844,4.844 0 0 0 -0.77602,-1.81284 z"
        fill="#14255b"
        id="path48"
      />
      <path
        d="m 296.06303,258.62563 a 5.97438,5.97438 0 0 0 -0.19294,-2.40912 5.28822,5.28822 0 0 1 0.80475,-2.99811 9.74824,9.74824 0 0 0 1.254,-2.74914 2.29934,2.29934 0 0 0 -0.0601,-1.34629 c -0.17444,-0.39187 -0.597,-0.57064 -0.83935,-0.26031 l 0.51867,0.33408 a 4.72334,4.72334 0 0 0 -2.10492,0.10192 2.605,2.605 0 0 0 -1.59527,1.79831 11.12985,11.12985 0 0 1 -0.4184,1.86585 c -0.30945,0.636 -0.90832,0.8475 -1.28467,1.4057 a 3.36093,3.36093 0 0 0 0.0529,3.19281 3.727,3.727 0 0 0 2.108,1.65774 c 0.63342,0.22736 1.46753,0.23935 1.75733,-0.59344 z"
        fill="#14255b"
        id="path50"
      />
      <path
        d="m 310.78617,263.0678 a 7.24267,7.24267 0 0 0 0.91223,1.67438 c 0.7049,0.71 1.66278,0.27365 2.51795,0.10113 a 4.35339,4.35339 0 0 1 4.14141,1.66113 10.54144,10.54144 0 0 0 -6.06274,-7.56393 17.81169,17.81169 0 0 0 -6.23517,-0.975 l -0.36212,0.0928 c 0.92273,2.68584 3.82016,2.62578 5.08844,5.00951 z"
        fill="#14255b"
        id="path52"
      />
      <path d="m 248.42814,268.56136 0.005,0.0117 0.10534,-0.20291 z" fill="#14255b" id="path54" />
      <path
        d="m 246.19456,272.88463 a 19.84048,19.84048 0 0 0 -1.25305,2.75266 23.96251,23.96251 0 0 0 -0.90815,4.71 c -0.1134,0.90771 -0.14843,2.067 0.42029,2.50934 a 0.80669,0.80669 0 0 0 1.0553,-0.14331 4.17345,4.17345 0 0 0 0.765,-1.13709 26.195,26.195 0 0 0 2.58252,-6.12933 10.66622,10.66622 0 0 0 -0.423,-6.87381 q -1.11929,2.15587 -2.23891,4.31154 z"
        fill="#14255b"
        id="path56"
      />
      <path
        d="m 224.64725,157.70299 a 2.5428,2.5428 0 0 0 2.74048,0.53485 9.04962,9.04962 0 0 0 2.57856,-1.70321 6.06684,6.06684 0 0 0 1.56317,-1.7052 3.4584,3.4584 0 0 0 0.31976,-2.6345 2.67591,2.67591 0 0 0 -2.03961,-1.61343 q -1.89825,-0.563 -3.79651,-1.12579 l 0.91547,-0.82511 c -0.9419,-0.50549 -1.98389,0.43265 -2.57258,1.59412 a 8.5823,8.5823 0 0 0 -0.78094,2.404 6.17054,6.17054 0 0 0 1.0722,5.07427 z"
        fill="#14255b"
        id="path58"
      />
      <path
        d="m 246.98966,150.20244 a 2.09059,2.09059 0 0 0 2.84931,0.23178 3.18493,3.18493 0 0 0 1.26025,-2.26986 c 0.0895,-0.99546 -0.40265,-2.10181 -1.10553,-2.18781 l 0.16089,-0.932 c -1.35419,-0.24456 -3.02051,-0.29354 -3.74622,1.35093 a 3.861,3.861 0 0 0 0.5813,3.80696 z"
        fill="#14255b"
        id="path60"
      />
      <ellipse cx="154.92935" cy="205.91937" rx="8.4473696" ry="11.32747" fill="#e6e6e6" id="ellipse62" />
      <ellipse cx="206.87653" cy="419.81036" rx="7.5566602" ry="5.2568102" transform="rotate(-14.91271)" fill="#e6e6e6" id="ellipse64" />
      <ellipse cx="158.90982" cy="407.98184" rx="7.556673" ry="5.2568092" transform="rotate(-14.912853)" fill="#e6e6e6" id="ellipse66" />
      <ellipse cx="225.9325" cy="382.35565" rx="7.5566602" ry="5.2568102" transform="rotate(-14.91271)" fill="#e6e6e6" id="ellipse68" />
      <ellipse cx="293.33246" cy="332.82626" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse70" />
      <ellipse cx="300.80762" cy="302.51028" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse72" />
      <ellipse cx="244.05988" cy="355.53464" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse74" />
      <ellipse cx="267.73132" cy="367.57797" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse76" />
      <ellipse cx="234.4892" cy="389.25497" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse78" />
      <ellipse cx="-19.708044" cy="316.53964" rx="7.5566602" ry="5.2568102" transform="rotate(-14.91271)" fill="#e6e6e6" id="ellipse80" />
      <ellipse cx="-67.676422" cy="304.71182" rx="7.5566602" ry="5.2568002" transform="rotate(-14.91271)" fill="#e6e6e6" id="ellipse82" />
      <ellipse cx="-0.65075666" cy="279.08408" rx="7.556673" ry="5.2568192" transform="rotate(-14.912853)" fill="#e6e6e6" id="ellipse84" />
      <ellipse cx="54.772667" cy="261.44943" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse86" />
      <ellipse cx="62.247829" cy="231.13347" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse88" />
      <ellipse cx="5.5001082" cy="284.15781" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse90" />
      <ellipse cx="29.171534" cy="296.20111" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse92" />
      <ellipse cx="-4.0706201" cy="317.87811" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse94" />
      <ellipse cx="319.16916" cy="210.23267" rx="7.5566602" ry="5.2568102" transform="rotate(-14.91271)" fill="#e6e6e6" id="ellipse96" />
      <ellipse cx="271.20087" cy="198.40485" rx="7.5566602" ry="5.2568002" transform="rotate(-14.91271)" fill="#e6e6e6" id="ellipse98" />
      <ellipse cx="338.22684" cy="172.77687" rx="7.556673" ry="5.2568192" transform="rotate(-14.912853)" fill="#e6e6e6" id="ellipse100" />
      <ellipse cx="375.96808" cy="109.88274" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse102" />
      <ellipse cx="383.44333" cy="79.566788" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse104" />
      <ellipse cx="326.69553" cy="132.59111" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse106" />
      <ellipse cx="350.36694" cy="144.63445" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse108" />
      <ellipse cx="317.12485" cy="166.31145" rx="3.3223" ry="4.7758098" transform="rotate(-7.0677)" fill="#e6e6e6" id="ellipse110" />
      <path
        d="m 48.927259,323.05701 c -8.08165,0 -13.33564,-2.00809 -15.66108,-6.00039 -4.58578,-7.87213 3.09455,-21.68533 22.82726,-41.05525 l 1.65762,1.68843 c -18.32967,17.99344 -26.29924,31.55092 -22.44059,38.176 2.44175,4.19026 9.70845,5.69228 21.01906,4.34123 11.22819,-1.34027 26.10821,-5.33564 44.226831,-11.87444 37.301,-13.462 84.099,-36.16945 131.77311,-63.9399 47.67262,-27.76968 90.50989,-57.27632 120.62157,-83.08336 5.78355,-4.95782 11.03254,-9.72732 15.601,-14.17484 a 155.3539,155.3539 0 0 0 16.54457,-18.43905 c 6.75409,-9.1708 9.0337,-16.23339 6.59233,-20.42441 -4.07779,-6.99981 -21.20777,-6.34161 -48.23722,1.856 l -0.68631,-2.26459 c 28.99941,-8.793755 46.14788,-9.057565 50.96821,-0.7822 2.99518,5.14153 0.73021,12.88618 -6.73137,23.01867 a 157.68877,157.68877 0 0 1 -16.79953,18.731 c -4.60389,4.48258 -9.89023,9.28558 -15.71192,14.27614 -30.21682,25.89755 -73.1781,55.492 -120.97049,83.331 -47.79356,27.84054 -94.72942,50.61273 -132.16056,64.12168 -18.287311,6.59965 -33.343341,10.63662 -44.749841,11.99768 a 65.2269,65.2269 0 0 1 -7.68265,0.5006 z"
        fill="#3f3d56"
        id="path112"
      />
    </svg>
  );
};

export default UndrawWorld;
