import React from 'react'
import Head from 'next/head'
import { SimpleGrid, Image, Flex, Spacer, Text, Button, Container } from '@chakra-ui/react'
import { getChampionData } from '../lib/champions'
import { ChampionCard } from '../components'
import { roles } from '../lib/roles'
import {
  Select,
} from "chakra-react-select";
import useMediaQuery from "../hooks/useMediaQuery";

export async function getStaticProps() {
  const allChampData = await getChampionData()
  const version = process.env.REACT_LOL_VERSION
  const roleNames = Object.keys(roles)
  return {
    props: {
      allChampData,
      version,
      roleNames
    }
  }
}

export default function Home({ allChampData, version, roleNames }) {

  const isDesktop = useMediaQuery('(min-width: 960px)');

  const [filter, setFilter] = React.useState(null)
  const [search, setSearch] = React.useState(null)

  return (
    <div className="container">
      <Head>
        <title>Lol Ultimate Team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Flex>
        <Image mt={isDesktop ? 0 : 5} mr={isDesktop ? 0 : 5} height={isDesktop ? '120px' : '80px'} src={'/images/league2.png'} alt={"League of Legends Logo"}></Image>
        <Spacer></Spacer>
        <Text mt={5} fontSize={isDesktop ? 48 : 32} fontFamily={'FrizQuadrata'}>
          Ultimate Team
        </Text>
        <Spacer></Spacer>
        <Text mt={5}>
          {version}
        </Text>
        </Flex>
      </header>

      <main>
          <Flex direction={isDesktop ? 'row' : 'column'} padding={1}>
            <Container width={'250px'}>
            <Select
              instanceId={'champion-select'}
              placeholder="Search..."
              width={'250px'}
              onChange={(event) => {
                setSearch(event.value)
              }}
              options={allChampData.map(champ => {
                return {
                  label: champ.name.toUpperCase(),
                  value: champ.name
                }
              })}
            />
            </Container>
            <Button
              variant='ghost'
              ml={2}
              mr={2}
              key={'all-button'}
              onClick={() => {
                setFilter(null)
                setSearch(null)
              } }
            >
              All
            </Button>
          {roleNames.map(role => {
            return (
              <Button
                variant='ghost'
                ml={2}
                mr={2}
                key={role + '-button'}
                onClick={() => { setFilter(role)}}
              >
                {role.toUpperCase()}
              </Button>
            )
          })}
          </Flex>
          <SimpleGrid columns={isDesktop ? 5 : 2} spacing={10} margin={5}>
            {
              (search 
                ? allChampData.filter(champ => champ.name === search)
                : filter ? allChampData.filter(champ => champ.main === filter) : allChampData).map(champ => <ChampionCard key={champ.name} champion={champ} ></ChampionCard>)
            }
          </SimpleGrid>
      </main>

      <footer>
        <a
          href="https://developer.riotgames.com/docs/lol#data-dragon"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by LoL Data Dragon
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: url('/images/rift.png');
          width: 100%;
          overflow: hidden;
          scrollbar-width: none;  
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          background-color: #061c25;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        header {
          width: 100%;
          padding: 30px;
          background-color: #061c25;
          color: #eaeaea;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #eaeaea;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        a {
          color: #006680;
        }

        @font-face {
          font-family: 'FrizQuadrata';
          src: url('/fonts/Friz-Quadrata-Font/Friz Quadrata Regular.ttf');
        }
      `}</style>
    </div>
  )
}
