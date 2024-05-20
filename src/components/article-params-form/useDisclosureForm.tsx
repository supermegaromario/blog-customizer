import { useEffect } from 'react';

type UseDisclosureFormProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	wrapperRef: React.RefObject<HTMLDivElement>;
};

export const useDisclosureForm = ({
	isOpen,
	setIsOpen,
	wrapperRef,
}: UseDisclosureFormProps) => {
	function handleArrowButtonClick() {
		setIsOpen(!isOpen);
	}

	useEffect(() => {
		function handleOutsideClick(event: MouseEvent) {
			const { target } = event;
			if (target instanceof Node && !wrapperRef.current?.contains(target)) {
				setIsOpen(false);
			}
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key == 'Escape') setIsOpen(false);
		};

		document.addEventListener('mousedown', handleOutsideClick);
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('mousedown', handleOutsideClick);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, setIsOpen, wrapperRef]);

	return handleArrowButtonClick;
};
