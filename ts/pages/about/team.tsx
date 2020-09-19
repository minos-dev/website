import * as _ from 'lodash';
import * as React from 'react';
import styled from 'styled-components';

import { colors } from 'ts/style/colors';

import { AboutPageLayout } from 'ts/components/aboutPageLayout';
import { DocumentTitle } from 'ts/components/document_title';
import { Column, Section } from 'ts/components/newLayout';
import { Heading, Paragraph } from 'ts/components/text';
import { WebsitePaths } from 'ts/types';
import { documentConstants } from 'ts/utils/document_meta_constants';

interface TeamMember {
    name: string;
    title: string;
    imageUrl?: string;
}

const team: TeamMember[] = [
    {
        imageUrl: '/images/team/willw.jpg',
        name: 'Will Warren',
        title: 'Co-founder & CEO',
    },
    {
        imageUrl: '/images/team/amirb.jpg',
        name: 'Amir Bandeali',
        title: 'Co-founder & CTO',
    },
    {
        imageUrl: '/images/team/alexv.jpg',
        name: 'Alex Xu',
        title: 'Chief of Staff',
    },
    {
        imageUrl: '/images/team/benb.jpg',
        name: 'Ben Burns',
        title: 'Designer',
    },
    {
        imageUrl: '/images/team/brandonm.jpg',
        name: 'Brandon Millman',
        title: 'Engineering Manager',
    },
    {
        imageUrl: '/images/team/jacobe.jpg',
        name: 'Jacob Evans',
        title: 'Senior Engineer',
    },
    {
        imageUrl: '/images/team/greg.jpg',
        name: 'Greg Hysen',
        title: 'Senior Protocol Engineer',
    },
    {
        imageUrl: '/images/team/blake.jpg',
        name: 'Blake Henderson',
        title: 'Product Manager',
    },
    {
        imageUrl: '/images/team/zack.jpg',
        name: 'Zack Skelly',
        title: 'Head of Talent',
    },
    {
        imageUrl: '/images/team/remcoB.jpg',
        name: 'Remco Bloemen',
        title: 'Technical Fellow',
    },
    {
        imageUrl: '/images/team/chrisk.jpg',
        name: 'Chris Kalani',
        title: 'GM, Matcha',
    },
    {
        imageUrl: '/images/team/peterz.jpg',
        name: 'Peter Zeitz',
        title: 'Research Fellow',
    },
    {
        imageUrl: '/images/team/clayr.jpg',
        name: 'Clay Robbins',
        title: 'Ecosystem Development Lead',
    },
    {
        imageUrl: '/images/team/eugenea.jpg',
        name: 'Eugene Aumson',
        title: 'Senior Engineer',
    },
    {
        imageUrl: '/images/team/jasons.jpg',
        name: 'Jason Somensatto',
        title: 'Senior Counsel',
    },
    {
        imageUrl: '/images/team/steve.jpg',
        name: 'Steve Klebanoff',
        title: 'Senior Engineer',
    },
    {
        imageUrl: '/images/team/xiannyn.jpg',
        name: 'Xianny Ng',
        title: 'Engineer',
    },
    {
        imageUrl: '/images/team/brento.jpg',
        name: 'Brent Oshiro',
        title: 'Community Engagement Lead',
    },
    {
        imageUrl: '/images/team/danielp.jpg',
        name: 'Daniel Pyrathon',
        title: 'Senior Engineer',
    },
    {
        imageUrl: '/images/team/lawrencef.jpg',
        name: 'Lawrence Forman',
        title: 'Protocol Engineer',
    },
    {
        imageUrl: '/images/team/paulv.jpg',
        name: 'Paul Vienhage',
        title: 'Research Engineer',
    },
    {
        imageUrl: '/images/team/ruiz.jpg',
        name: 'Rui Zhang',
        title: 'Corporate Counsel',
    },
    {
        imageUrl: '/images/team/masonl.jpg',
        name: 'Mason Liang',
        title: 'Research Engineer',
    },
    {
        imageUrl: '/images/team/patryka.jpg',
        name: 'Patryk Adaś',
        title: 'Designer',
    },
    {
        imageUrl: '/images/team/alexk.jpg',
        name: 'Alex Kroeger',
        title: 'Data Scientist',
    },
    {
        imageUrl: '/images/team/theog.jpg',
        name: 'Theo Gonella',
        title: 'Product Manager',
    },
    {
        imageUrl: '/images/team/alext.jpg',
        name: 'Alex Towle',
        title: 'Protocol Engineer',
    },
    {
        imageUrl: '/images/team/oskarp.jpg',
        name: 'Oskar Paolini',
        title: 'DevOps Engineer',
    },
    {
        imageUrl: '/images/team/michaelz.jpg',
        name: 'Michael Zhu',
        title: 'Protocol Engineer',
    },
    {
        imageUrl: '/images/team/fulviam.jpg',
        name: 'Fulvia Morales',
        title: 'Product Manager',
    },
    {
        imageUrl: '/images/team/kimp.jpg',
        name: 'Kim Persson',
        title: 'Engineer',
    },
    {
        imageUrl: '/images/team/johnj.jpg',
        name: 'John Johnson',
        title: 'Senior Engineer',
    },
    {
        imageUrl: '/images/team/nicoles.jpg',
        name: 'Nicole Setter',
        title: 'Workplace Experience Specialist',
    },
    {
        imageUrl: '/images/team/maxt.jpg',
        name: 'Max Torres',
        title: 'Finance Lead',
    },
];

const advisors: TeamMember[] = [
    {
        imageUrl: '/images/team/advisors/frede.jpg',
        name: 'Fred Ehrsam',
        title: 'Paradigm',
    },
    {
        imageUrl: '/images/team/advisors/olafc.jpg',
        name: 'Olaf Carlson-Wee',
        title: 'Polychain Capital',
    },
    {
        imageUrl: '/images/team/advisors/joeyk.jpg',
        name: 'Joey Krug',
        title: 'Pantera Capital, Augur',
    },
    {
        imageUrl: '/images/team/advisors/lindax.jpg',
        name: 'Linda Xie',
        title: 'Scalar Capital',
    },
    {
        imageUrl: '/images/team/advisors/davids.jpg',
        name: 'David Sacks',
        title: 'Craft Ventures',
    },
];

export const NextAboutTeam = () => (
    <AboutPageLayout
        title="We are a global, growing team"
        description={
            <Paragraph size="medium" marginBottom="60px" isMuted={0.65}>
                We are a distributed team with backgrounds in engineering, academic research, business, and design. The
                0x Core Team is passionate about accelerating the adoption decentralized technology and believe in its
                potential to be an equalizing force in the world. Join us and do the most impactful work of your life.
            </Paragraph>
            // tslint:disable-next-line:jsx-curly-spacing
        }
        linkLabel="Join the team"
        to={WebsitePaths.AboutJobs}
    >
        <DocumentTitle {...documentConstants.TEAM} />
        <Section maxWidth="1170px" wrapWidth="100%" isFlex={true} flexBreakpoint="900px">
            <Column>
                <Heading size="medium">0x Team</Heading>
            </Column>

            <Column width="70%" maxWidth="800px">
                <StyledGrid>
                    {_.map(team, (info: TeamMember, index: number) => (
                        <Member key={`team-${index}`} name={info.name} title={info.title} imageUrl={info.imageUrl} />
                    ))}
                </StyledGrid>
            </Column>
        </Section>

        <Section bgColor="#F3F6F4" maxWidth="1170px" wrapWidth="100%" flexBreakpoint="900px" isFlex={true}>
            <Column>
                <Heading size="medium">Advisors</Heading>
            </Column>

            <Column width="70%" maxWidth="800px">
                <StyledGrid>
                    {_.map(advisors, (info: TeamMember, index: number) => (
                        <Member key={`advisor-${index}`} name={info.name} title={info.title} imageUrl={info.imageUrl} />
                    ))}
                </StyledGrid>
            </Column>
        </Section>
    </AboutPageLayout>
);

const StyledGrid = styled.div`
    &:after {
        content: '';
        clear: both;
    }
`;

const Member = ({ name, title, imageUrl }: TeamMember) => (
    <StyledMember>
        <img src={imageUrl} alt={name} />
        <Name>{name}</Name>
        <MemberTitle isMuted={0.5} size={14}>
            {title}
        </MemberTitle>
    </StyledMember>
);

const StyledMember = styled.div`
    margin-bottom: 10px;
    float: left;
    width: calc(50% - 15px);
    margin-right: 15px;

    @media (max-width: 600px) {
        &:nth-child(2n + 1) {
            clear: left;
        }
    }

    img,
    svg {
        width: 100%;
        height: auto;
        object-fit: contain;
        margin-bottom: 10px;
    }

    @media (min-width: 600px) {
        width: calc(33.3333% - 30px);
        margin-right: 20px;

        &:nth-child(3n + 1) {
            clear: left;
        }
    }

    @media (min-width: 900px) {
        width: calc(25% - 30px);

        &:nth-child(3n + 1) {
            clear: none;
        }

        &:nth-child(4n + 1) {
            clear: left;
        }
    }
`;

const Name = styled.h3`
    color: ${colors.textDarkPrimary};
    font-size: 14px;
    line-height: 1;
    margin: 0 0 3px 0;
`;

const MemberTitle = styled(Paragraph)`
    font-size: 14px;
`;
