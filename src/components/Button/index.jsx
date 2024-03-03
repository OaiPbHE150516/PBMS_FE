import clsx from "clsx"
import './Button.css'

/**
 * 
 * @param {{ 
 * className: string,
 * reset: boolean,
 * children: any,
 * size?: 'btn-lg' | "btn-sm"
 * }} param0 
 * @returns 
 */
const Button = ({ className, reset, children, size, type="button", ...props }) => {
  return (
    <button className={reset ? clsx("btn-reset", className) : clsx(className ?? 'btn-light',size, 'btn c-btn')} type={type} {...props}>{children}</button>
  )
}

export default Button