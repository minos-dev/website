import * as React from 'react';

import { SiteWrap } from 'ts/components/siteWrap';
import { Header as StakingHeader } from 'ts/components/staking/header/header';

import { DocumentTitle } from 'ts/components/document_title';

import { documentConstants } from 'ts/utils/document_meta_constants';

import { ConnectWalletDialog } from 'ts/components/dialogs/connect_wallet_dialog';

interface IStakingPageLayoutProps {
    children: React.ReactNode;
    title: string;
    description?: string;
    keywords?: string;
    subtitle?: string;
    loading?: boolean;
    isHome?: boolean;
}

const { description, keywords, title } = documentConstants.STAKING;

export const StakingPageLayout: React.FC<IStakingPageLayoutProps> = (props) => {
    return (
        <SiteWrap isDocs={true} theme="staking" headerComponent={StakingHeader}>
            <DocumentTitle
                title={props.isHome ? title : `${title}: ${props.title}`}
                description={props.description ? props.description : description}
                keywords={props.keywords ? props.keywords : keywords}
            />

            {props.children}
            <ConnectWalletDialog />
        </SiteWrap>
    );
};
