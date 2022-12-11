import React from 'react';
import { IconBaseProps } from 'react-icons';
import {
	AiOutlineCopy,
	AiOutlineTwitter,
	AiOutlineSend,
	AiOutlineWhatsApp,
	AiOutlineSearch
} from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';

interface IconProps extends IconBaseProps {
	iconKey: string;
}

export const icons = {
	AiOutlineCopy: 'AiOutlineCopy',
	FaFacebookF: 'FaFacebookF',
	AiOutlineTwitter: 'AiOutlineTwitter',
	AiOutlineWhatsApp: 'AiOutlineWhatsApp',
	AiOutlineSend: 'AiOutlineSend',
	AiOutlineSearch: 'AiOutlineSearch'
};

export default function Icon({ iconKey, ...rest }: IconProps) {
	switch (iconKey) {
		case 'AiOutlineCopy':
			return <AiOutlineCopy {...rest} />;
		case 'FaFacebookF':
			return <FaFacebookF {...rest} />;
		case 'AiOutlineTwitter':
			return <AiOutlineTwitter {...rest} />;
		case 'AiOutlineWhatsApp':
			return <AiOutlineWhatsApp {...rest} />;
		case 'AiOutlineSend':
			return <AiOutlineSend {...rest} />;
		case 'AiOutlineSearch':
			return <AiOutlineSearch {...rest} />;
		default:
			return <div>Component Not Found</div>;
	}
}
