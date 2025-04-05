import React from "react";

export const CreateOccupyIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="140"
      height="141"
      viewBox="0 0 140 141"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect opacity="0.01" y="0.5" width="140" height="140" fill="white" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 15.5H102V111.5H24V15.5Z"
        fill="#D7DBEC"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M38 33.5C38 31.2909 39.7909 29.5 42 29.5H102L116 43.5V99.5H38V33.5Z"
        fill="#B6CBFF"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M38 29.5H102V43.5H116V125.5H38V29.5Z"
        fill="#A74E8E"
      />
      <rect x="52" y="56.5" width="50" height="4" fill="white" />
      <rect x="52" y="68.5" width="50" height="4" fill="white" />
      <rect x="52" y="80.5" width="50" height="4" fill="white" />
      <rect x="52" y="92.5" width="20" height="4" fill="white" />
    </svg>
  );
};

export const OnboardingIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="141"
    height="141"
    viewBox="0 0 141 141"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      opacity="0.01"
      x="0.5"
      y="0.5"
      width="140"
      height="140"
      fill="white"
    />
    <circle cx="40.5" cy="50.5" r="24" fill="#D7DBEC" />
    <mask
      id="mask0_631_46531"
      // style="mask-type:luminance"
      maskUnits="userSpaceOnUse"
      x="16"
      y="26"
      width="49"
      height="49"
    >
      <circle cx="40.5" cy="50.5" r="24" fill="white" />
    </mask>
    <g mask="url(#mask0_631_46531)">
      <circle cx="40.5" cy="44.5" r="8" fill="#131523" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.501 68.2942C26.1734 61.3872 32.7772 56.5 40.5004 56.5C48.2236 56.5 54.8273 61.387 57.4998 68.2938C53.1941 72.7384 47.1689 75.5 40.5002 75.5C33.8317 75.5 27.8066 72.7385 23.501 68.2942Z"
        fill="#131523"
      />
    </g>
    <circle cx="84" cy="74" r="40.5" fill="#A74E8E" />
    <mask
      id="mask1_631_46531"
      // style="mask-type:luminance"
      maskUnits="userSpaceOnUse"
      x="43"
      y="33"
      width="82"
      height="82"
    >
      <circle cx="84" cy="74" r="40.5" fill="white" />
    </mask>
    <g mask="url(#mask1_631_46531)">
      <circle cx="84" cy="64" r="13.5" fill="#B6CBFF" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M54.3604 103.812C59.1041 91.8865 70.3645 83.5 83.5003 83.5C97.1918 83.5 108.846 92.611 113.207 105.345C105.811 112.863 95.678 117.5 84.5004 117.5C72.5822 117.5 61.8517 112.229 54.3604 103.812Z"
        fill="#B6CBFF"
      />
    </g>
  </svg>
);

export const BusinessInfoIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="140"
      height="141"
      viewBox="0 0 140 141"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect opacity="0.01" y="0.5" width="140" height="140" fill="white" />
      <rect
        x="3.83301"
        y="70.0195"
        width="102"
        height="60"
        rx="4"
        transform="rotate(-30 3.83301 70.0195)"
        fill="#D7DBEC"
      />
      <rect
        x="9.83301"
        y="80.4121"
        width="102"
        height="12"
        transform="rotate(-30 9.83301 80.4121)"
        fill="#131523"
      />
      <rect x="34" y="61.5" width="102" height="60" rx="4" fill="#A74E8E" />
      <rect x="112" y="73.5" width="12" height="12" rx="6" fill="#B6CBFF" />
      <rect x="103" y="73.5" width="12" height="12" rx="6" fill="#B6CBFF" />
      <rect x="46" y="101.5" width="50" height="8" fill="#B6CBFF" />
      <rect x="46" y="81.5" width="15" height="12" fill="#B6CBFF" />
    </svg>
  );
};
