import { LoaderFunction, ActionFunction } from "react-router-dom";
import { IRoute, Pages, Link } from './types';

const pages: Pages = import.meta.glob("./pages/**/*.tsx", { eager: true });

function addLinkToTree(links: Link[], link: Link): void {
    const pathParts = link.path.split('/').filter(part => part);
    let currentLevel = links;

    pathParts.forEach((part, index) => {
        let existingLink = currentLevel.find(l => l.name === part);
        if (!existingLink) {
            existingLink = { path: `/${pathParts.slice(0, index + 1).join('/')}`, name: part, children: [] };
            currentLevel.push(existingLink);
        }
        currentLevel = existingLink.children!;
    });
}

export function generateRoutesAndLinks(): { routes: IRoute[], links: Link[] } {
    const routes: IRoute[] = [];
    const links: Link[] = [];

    for (const path of Object.keys(pages)) {
        const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
        if (!fileName) {
            continue;
        }

        const normalizedPathName = fileName.includes("$")
            ? fileName.replace("$", ":")
            : fileName.replace(/\/index/, "");

        const page = pages[path];
        if (!page.default) {
            continue;
        }

        const routePath = fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`;
        const linkName = page.linkName || fileName.replace(/\//g, " > ");

        routes.push({
            path: routePath,
            Element: page.default,
            loader: page.loader as LoaderFunction | undefined,
            action: page.action as ActionFunction | undefined,
            ErrorBoundary: page.ErrorBoundary,
        });

        addLinkToTree(links, { path: routePath, name: linkName });
    }

    return { routes, links };
}

export const ERROR_MESSAGES = {
    INVALID_EMAIL: '유효한 이메일 주소를 입력하세요.',
    PASSWORD_LENGTH: '비밀번호는 12글자 이내로 해야 합니다.',
    PASSWORD_SPECIAL_CHAR: '특수문자가 포함되어야 합니다: #, $, !, *, &',
    NAME_LENGTH: '이름은 12글자 이내로 해야 합니다.',
    NAME_SPECIAL_CHAR: '특수문자가 포함되면 안됩니다.'
};

export const validateEmail = (email: string): string => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return ERROR_MESSAGES.INVALID_EMAIL;
    return '';
};

export const validatePassword = (password: string): string => {
    if (password.length > 12) return ERROR_MESSAGES.PASSWORD_LENGTH;
    if (!/[#\$!\*=&]/.test(password)) return ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR;
    return '';
};

export const validateName = (name: string): string => {
    if (name.length > 12) return ERROR_MESSAGES.NAME_LENGTH;
    return '';
}