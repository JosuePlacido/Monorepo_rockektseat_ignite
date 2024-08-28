import styles from "./Header.module.css";
import igniteLogo from "../assets/Logo.png";

export function Header() {
	return (
		<header className={styles.header}>
			<img src={igniteLogo} alt="Logotipo do ToDO" />
		</header>
	);
}
