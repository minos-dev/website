import * as _ from 'lodash';
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { MDXProvider } from '@mdx-js/react';

import { Animation } from 'ts/components/docs/mdx/animation';
import { Code } from 'ts/components/docs/mdx/code';
import { CodeTabs } from 'ts/components/docs/mdx/code_tabs';
import { Emphasis } from 'ts/components/docs/mdx/emphasis';
import { H1, H2, H3, H4, H5, H6 } from 'ts/components/docs/mdx/headings';
import { HelpCallout } from 'ts/components/docs/mdx/help_callout';
import { HelpfulCta } from 'ts/components/docs/mdx/helpful_cta';
import { Image } from 'ts/components/docs/mdx/image';
import { InlineCode } from 'ts/components/docs/mdx/inline_code';
import { InlineLink } from 'ts/components/docs/mdx/inline_link';
import { NewsletterWidget } from 'ts/components/docs/mdx/newsletter_widget';
import { Note } from 'ts/components/docs/mdx/note';
import { Notification } from 'ts/components/docs/mdx/notification';
import { OrderedList } from 'ts/components/docs/mdx/ordered_list';
import { Paragraph } from 'ts/components/docs/mdx/paragraph';
import { Table } from 'ts/components/docs/mdx/table';
import { UnorderedList } from 'ts/components/docs/mdx/unordered_list';

import { Separator } from 'ts/components/docs/shared/separator';
import { StepLinks } from 'ts/components/docs/shared/step_links';

import { Columns } from 'ts/components/docs/layout/columns';
import { ContentWrapper } from 'ts/components/docs/layout/content_wrapper';
import { DocsPageLayout } from 'ts/components/docs/layout/docs_page_layout';

import { IContents, TableOfContents } from 'ts/components/docs/sidebar/table_of_contents';

import { PageNotFound } from 'ts/pages/docs/page_not_found';

import { fetchAsync } from '@0x/utils';
import { docs } from 'ts/style/docs';

import meta from 'ts/utils/algolia_meta.json';

// @ts-ignore no type definition for this one
import MDXRuntime from '@mdx-js/runtime';
const remark = require('remark');
const remarkSlug = require('remark-slug');
const remarkAutolinkHeadings = require('../../../webpack/remark_autolink_headings');
const remarkSectionizeHeadings = require('../../../webpack/remark_sectionize_headings');
const remarkTableOfContents = require('../../../webpack/remark_table_of_contents');

interface IDocsPageProps extends RouteComponentProps<any> {}
interface IDocsPageState {
    Document: React.ReactNode;
    contents: IContents[];
    wasNotFound: boolean;
}

export const DocsPage: React.FC<IDocsPageProps> = props => {
    const { page, type, version } = props.match.params;
    const { hash } = props.location;
    // For api explorer / core-concepts the url does not include the page, i.e. it's only 'docs/core-concepts'
    const key = page ? page : type;
    // @ts-ignore
    const pageMeta = meta[type] && meta[type][key];
    const isToolsPage = type === 'tools';

    if (!pageMeta) {
        return <PageNotFound />;
    }

    const [state, setState] = React.useState<IDocsPageState>({
        Document: '',
        contents: [],
        wasNotFound: false,
    });

    const { Document, contents, wasNotFound } = state;

    const { description, keywords, path, resourceUri, subtitle, title, versions } = pageMeta;

    const isLoading = !Document;

    // If the route path includes a version, replace the initial version on path
    const filePath = versions && version ? path.replace(versions[0], version) : path;

    React.useEffect(() => {
        void loadPageAsync();
    }, []);

    const loadPageAsync = async () => {
        try {
            if (isToolsPage) {
                const response = await fetchAsync(resourceUri);
                const content = await response.text();
                const tableOfContents = await getTableOfContentsAsync(content);

                setState({
                    ...state,
                    Document: content,
                    contents: tableOfContents,
                });
            } else {
                const component = await import(/* webpackChunkName: "mdx/[request]" */ `mdx/${filePath}`);

                setState({
                    ...state,
                    Document: component.default,
                    contents: component.tableOfContents(),
                });
            }

            if (hash) {
                await waitForImages(); // images will push down content when loading, so we wait...
                scrollToHash(hash); // ...and then scroll to hash when ready not to push the content down
            }
        } catch (error) {
            setState({ ...state, wasNotFound: true });
        }
    };

    if (wasNotFound) {
        return <PageNotFound />;
    }

    return (
        <DocsPageLayout
            title={title}
            description={description}
            keywords={keywords}
            subtitle={subtitle}
            loading={isLoading}
        >
            <Columns>
                <TableOfContents contents={contents} versions={versions} />
                <Separator />
                <ContentWrapper>
                    {isToolsPage ? (
                        <MDXRuntime
                            components={mdxComponents}
                            remarkPlugins={[remarkSlug, remarkAutolinkHeadings, remarkSectionizeHeadings]}
                        >
                            {Document}
                        </MDXRuntime>
                    ) : (
                        <MDXProvider components={mdxComponents}>
                            {/*
                                // @ts-ignore */}
                            <Document />
                        </MDXProvider>
                    )}

                    <HelpCallout />
                    <HelpfulCta page={key} />
                </ContentWrapper>
            </Columns>
        </DocsPageLayout>
    );
};

const mdxComponents = {
    a: InlineLink,
    code: Code,
    em: Emphasis,
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    hr: Separator,
    img: Image,
    inlineCode: InlineCode,
    ol: OrderedList,
    p: Paragraph,
    table: Table,
    ul: UnorderedList,
    Animation,
    CodeTabs,
    Image,
    NewsletterWidget,
    Note,
    Notification,
    StepLinks,
};

const getTableOfContentsAsync = async (content: string) => {
    let tableOfContents;

    await remark()
        .use(remarkSlug)
        .use(() => (tree: any) => {
            tableOfContents = remarkTableOfContents(tree);
        })
        .process(content);

    return tableOfContents;
};

const waitForImages = async () => {
    const images = document.querySelectorAll('img');
    return Promise.all(
        _.compact(
            _.map(images, (img: HTMLImageElement) => {
                if (!img.complete) {
                    // tslint:disable-next-line:no-inferred-empty-object-type
                    return new Promise(resolve => {
                        img.addEventListener('load', () => resolve());
                    });
                }
                return false;
            }),
        ),
    );
};

const scrollToHash = (hash: string): void => {
    const element = document.getElementById(hash.substring(1));
    if (element) {
        const bodyRect = document.body.getBoundingClientRect();
        const elemRect = element.getBoundingClientRect();
        const elemOffset = elemRect.top - bodyRect.top;
        const totalOffset = elemOffset - docs.headerOffset;
        window.scrollTo(0, totalOffset);
    }
};
