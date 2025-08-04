import { Button as ShadcnButton } from "@/components/ui/button"

export function Button(props) {
  return (
    <ShadcnButton
      {...props}
      className={`${props.className ?? ""} cursor-pointer`}
    />
  )
}
