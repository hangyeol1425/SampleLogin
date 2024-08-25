// Links.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { generateRoutesAndLinks } from '../../utils';
import { Link as LinkType } from '../../types';

const renderLinks = (links: LinkType[]) => {
    return (
        <ul>
            {links.map((item, index) => (
                <li key={index}>
                    <Link to={item.path}>{item.name}</Link>
                    {item.children && renderLinks(item.children)}
                </li>
            ))}
        </ul>
    );
};

const Links = () => {
    const [links, setLinks] = useState<LinkType[]>([]);

    useEffect(() => {
        const { links } = generateRoutesAndLinks();
        setLinks(links);
    }, []);

    return (
        <>
            <Link to='/'>HOME</Link>
            {renderLinks(links)}
        </>
    );
};

export default Links;