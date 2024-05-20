import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState, useRef, FormEvent } from 'react';
import { useDisclosureForm } from './useDisclosureForm';
import {
	OptionType,
	ArticleStateType,
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	params: ArticleStateType;
	setParams: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	params,
	setParams,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleParams, setArticleParams] = useState(params);

	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const handleArrowButtonClick = useDisclosureForm({
		isOpen,
		setIsOpen,
		wrapperRef,
	});

	const asideClassName = clsx(styles.container, {
		[styles.container_open]: isOpen,
	});

	const handleFontFamilyChange = (value: OptionType) => {
		setArticleParams({ ...articleParams, fontFamilyOption: value });
	};

	const handleFontColorChange = (value: OptionType) => {
		setArticleParams({ ...articleParams, fontColor: value });
	};

	const handleBackgroundColorChange = (value: OptionType) => {
		setArticleParams({ ...articleParams, backgroundColor: value });
	};

	const handleContentWidthChange = (value: OptionType) => {
		setArticleParams({ ...articleParams, contentWidth: value });
	};

	const handleFontSizeChange = (value: OptionType) => {
		setArticleParams({ ...articleParams, fontSizeOption: value });
	};

	const handleReset = () => {
		setArticleParams(defaultArticleState);
		setParams(defaultArticleState);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setParams(articleParams);
	};

	return (
		<div ref={wrapperRef}>
			<ArrowButton onClick={handleArrowButtonClick} isContainerOpen={isOpen} />
			<aside className={asideClassName}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={articleParams.fontFamilyOption}
						options={fontFamilyOptions}
						title={'Шрифт'}
						onChange={handleFontFamilyChange}
					/>
					<RadioGroup
						name={'fontSize'}
						selected={articleParams.fontSizeOption}
						options={fontSizeOptions}
						title={'Размер шрифта'}
						onChange={handleFontSizeChange}
					/>
					<Select
						selected={articleParams.fontColor}
						options={fontColors}
						title={'Цвет шрифта'}
						onChange={handleFontColorChange}
					/>
					<Separator />
					<Select
						selected={articleParams.backgroundColor}
						options={backgroundColors}
						title={'Цвет фона'}
						onChange={handleBackgroundColorChange}
					/>
					<Select
						selected={articleParams.contentWidth}
						options={contentWidthArr}
						title={'Ширина контента'}
						onChange={handleContentWidthChange}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
