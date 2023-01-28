import React from 'react';
import {
	AiFillStar,
	AiOutlineCopy,
	AiOutlineMail,
	AiOutlineSearch,
	AiOutlineSend,
	AiOutlineTwitter,
	AiOutlineReload,
	AiOutlineWhatsApp
} from 'react-icons/ai';
import { HiViewList } from 'react-icons/hi';
import { FaFacebookF } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import { ImCross } from 'react-icons/im';
import { GoSignOut } from 'react-icons/go';
import {
	BsLinkedin,
	BsWordpress,
	BsTwitter,
	BsYoutube,
	BsGithub,
	BsDiscord
} from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
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
	AiOutlineMail: 'AiOutlineMail',
	HiViewList: 'HiViewList',
	ImCross: 'ImCross',
	GoSignOut: 'GoSignOut',
	AiOutlineReload: 'AiOutlineReload',
	BsLinkedin: 'BsLinkedin',
	BsWordpress: 'BsWordpress',
	BsYoutube: 'BsYoutube',
	BsGithub: 'BsGithub',
	FiEdit: 'FiEdit',
	BsTwitter: 'BsTwitter',
	BsDiscord: 'BsDiscord'
} as const;

export type IconKeys = keyof typeof icons;

export default function Icon({ iconKey, ...rest }: IconProps) {
	switch (iconKey) {
		case icons.AiOutlineCopy:
			return <AiOutlineCopy {...rest} />;
		case icons.FaFacebookF:
			return <FaFacebookF {...rest} />;
		case icons.AiOutlineTwitter:
			return <AiOutlineTwitter {...rest} />;
		case icons.AiOutlineWhatsApp:
			return <AiOutlineWhatsApp {...rest} />;
		case icons.AiOutlineSend:
			return <AiOutlineSend {...rest} />;
		case icons.AiOutlineSearch:
			return <AiOutlineSearch {...rest} />;
		case icons.AiFillStar:
			return <AiFillStar {...rest} />;
		case icons.AiOutlineMail:
			return <AiOutlineMail {...rest} />;
		case icons.HiViewList:
			return <HiViewList {...rest} />;
		case icons.ImCross:
			return <ImCross {...rest} />;
		case icons.GoSignOut:
			return <GoSignOut {...rest} />;
		case icons.AiOutlineReload:
			return <AiOutlineReload {...rest} />;
		case icons.BsLinkedin:
			return <BsLinkedin {...rest} />;
		case icons.BsWordpress:
			return <BsWordpress {...rest} />;
		case icons.BsYoutube:
			return <BsYoutube {...rest} />;
		case icons.BsGithub:
			return <BsGithub {...rest} />;
		case icons.FiEdit:
			return <FiEdit {...rest} />;
		case icons.BsTwitter:
			return <BsTwitter {...rest} />;
		case icons.BsDiscord:
			return <BsDiscord {...rest} />;
		default:
			return <div>Component Not Found</div>;
	}
}
