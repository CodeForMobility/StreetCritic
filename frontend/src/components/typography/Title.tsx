import { Title as MTitle, TitleOrder, TitleSize } from "@mantine/core";

type Props = {
  order?: TitleOrder;
  size?: TitleSize;
  children: React.ReactNode;
};

export default function Title({ order, size, children }: Props) {
  const actualOrder = order || 1;
  return (
    <MTitle
      order={actualOrder}
      c={actualOrder === 1 ? "gray.9" : undefined}
      ta={actualOrder === 1 ? "center" : undefined}
      pt={actualOrder === 1 ? "lg" : undefined}
      size={size}
      mb="md"
    >
      {children}
    </MTitle>
  );
}
