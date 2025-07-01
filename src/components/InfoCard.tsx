// components/InfoCard.tsx
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "tertiary" | "danger" | "warning" | "info";

interface InfoCardProps {
  heading: string;
  content: ReactNode;
  icon: ReactNode;
  variant?: Variant;
  subText?: ReactNode;
  titleSize?: "base" | "lg";
}

// Define the style object shape
interface VariantStyle {
  border: string;
  bg: string;
  iconBg: string;
  iconColor: string;
  titleColor?: string;
}

// Create a typed mapping of variants to their styles
const variantStyles: Record<Variant, VariantStyle> = {
  primary: {
    border: "border-green-200",
    bg: "bg-green-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  secondary: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  tertiary: {
    border: "border-blue-200",
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  danger: {
    border: "border-red-200",
    bg: "bg-red-50",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    titleColor: "text-red-700",
  },
  warning: {
    border: "border-yellow-200",
    bg: "bg-yellow-50",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-700",
  },
  info: {
    border: "border-cyan-200",
    bg: "bg-cyan-50",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    titleColor: "text-cyan-700",
  },
};

const InfoCard = ({ heading, content, icon, variant = "primary", subText, titleSize }: InfoCardProps) => {
  const styles = variantStyles[variant];
  return (
    <div className={`p-5 rounded-md shadow-lg border ${styles.border} ${styles.bg}`}>
      <div className="flex items-center">
        <div className={`${styles.iconBg} rounded-lg mr-3 flex items-center justify-center w-9 h-9`}>
          <div className={`${styles.iconColor} text-xl`}>
            {icon}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className={`font-semibold leading-4 !mb-0 ${titleSize === "base" ? "text-base" : "text-lg"}`}>
            {heading}
          </h3>
          {subText && <div className="mt-1">{subText}</div>}
        </div>
      </div>
      <div className="mt-3 [&>*]:text-sm [&>p]:leading-[1.6] text-gray-800">
        {content}
      </div>


    </div>
  );
};

export default InfoCard;
