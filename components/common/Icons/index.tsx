import React from 'react';
import {
	AiFillStar,
	AiOutlineCopy,
	AiOutlineMail,
	AiOutlineSearch,
	AiOutlineSend,
	AiOutlineTwitter,
	AiOutlineWhatsApp
} from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

interface IconProps extends IconBaseProps {
	iconKey: string;
}

export const icons = {
	AiOutlineCopy: 'AiOutlineCopy',
	FaFacebookF: 'FaFacebookF',
	AiOutlineTwitter: 'AiOutlineTwitter',
	AiOutlineWhatsApp: 'AiOutlineWhatsApp',
	AiOutlineSend: 'AiOutlineSend',
	AiOutlineSearch: 'AiOutlineSearch',
	AiFillStar: 'AiFillStar',
	AiOutlineMail: 'AiOutlineMail'
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
		case 'AiFillStar':
			return <AiFillStar {...rest} />;
		case 'AiOutlineMail':
			return <AiOutlineMail {...rest} />;
		default:
			return <div>Component Not Found</div>;
	}
}
