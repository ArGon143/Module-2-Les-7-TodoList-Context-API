import React from 'react';
import styles from './Button.module.css';

function Button({ disabled, onClick, titleButton }) {
	return (
		<button className={styles.button} disabled={disabled} onClick={onClick}>
			{titleButton}
		</button>
	);
}

export default Button;
