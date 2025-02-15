import { ImgHTMLAttributes } from "react";
import styles from "./Avatar.module.css";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {
	hasBorder?: boolean;
	src: string;
	alt?: string;
}
export function Avatar({ hasBorder = true, src, alt = "", ...rest }: IProps) {
	return (
		<img
			className={hasBorder ? styles.avatarWithBorder : styles.avatar}
			src={src}
			alt={alt}
			{...rest}
		/>
	);
}
