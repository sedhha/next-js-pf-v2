declare module '*module.css' {
<<<<<<< HEAD
  const styles: {
    [className: string]: string
  }
  export default styles
=======
	const styles: {
		[className: string]: string;
	};
	export default styles;
}

declare module '*.svg' {
	import React = require('react');
	export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
>>>>>>> 1371c7eab4c9c61483e2b5c08281477e95c3821a
}
