import { tv } from "tailwind-variants";

export const title = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
    },
    size: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-4xl lg:text-6xl",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-b",
    },
  ],
});

export const subtitle = tv({
  base: "w-full md:w-1/2 my-2 text-lg lg:text-xl text-default-600 block max-w-full",
  variants: {
    fullWidth: {
      true: "!w-full",
    },
  },
  defaultVariants: {
    fullWidth: true,
  },
});

export const layoutContainer = tv({
  base: "flex flex-col md:flex-row h-screen transition-colors",
  variants: {
    theme: {
      light: "bg-gradient-to-b from-[#87c1ff] to-[#0072F5]",
      dark: "bg-gradient-to-b from-[#1e1e1e] to-[#111111]",
    },
  },
});

export const sidebar = tv({
  base: "flex p-5 h-1/6 lg:w-1/2",
});

export const contentContainer = tv({
  base: "bg-white flex flex-col items-center w-full h-full rounded-tl-[120px] p-8 transition-colors",
  variants: {
    theme: {
      light: "bg-white text-black",
      dark: "bg-[#303030] text-white",
    },
  },
});
