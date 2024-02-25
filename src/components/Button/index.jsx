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
const Button = ({ className = 'btn-light', reset, children, size, type="button", ...props }) => {
  return (
    <button className={reset ? "btn-reset" : clsx(className,size, 'btn c-btn')} type={type} {...props}>{children}</button>
  )
}

export default Button