import { Box, Image, Flex, Spacer, useDisclosure } from '@chakra-ui/react'
import _ from 'lodash'
import {
  AssassinIcon,
  FighterIcon,
  TankIcon,
  MageIcon,
  MarksmanIcon,
  SupportIcon
} from '../roleIcon'
import { ChampionModal } from '../championModal'
import useMediaQuery from "../../hooks/useMediaQuery";

const renderIcon = (main, size) => {
  switch (main) {
    case "assassin": {
      return <AssassinIcon boxSize={size} color='red.400'></AssassinIcon>
    }
    case "fighter": {
      return <FighterIcon boxSize={size} color='orange.400'></FighterIcon>
    }
    case "tank": {
      return <TankIcon boxSize={size} color='yellow.400'></TankIcon>
    }
    case "mage": {
      return <MageIcon boxSize={size} color='blue.400'></MageIcon>
    }
    case "marksman": {
      return <MarksmanIcon boxSize={size} color='purple.400'></MarksmanIcon>
    }
    case "support": {
      return <SupportIcon boxSize={size} color='green.400'></SupportIcon>
    }
    default: {
      return  <SupportIcon boxSize={size}></SupportIcon>
    }
  }
}

export default function ChampionCard({ champion }) {
  const isDesktop = useMediaQuery('(min-width: 960px)');
  const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
      <Box 
        maxW='sm' 
        borderWidth='1px' 
        borderRadius='lg' 
        overflow='hidden'
        role="group"
        bg="#061c25"
        onClick={onOpen}
      >
        <Image src={champion.image} alt={champion.name} width='100%' _hover={{ transform: 'scale(1)', transitionDuration: '200ms' }} transform={'scale(1.05)'}/>
        <Box p='4'  _groupHover={{ transitionDuration: '200ms', transitionTimingFunction: 'easing-in-out', bg: "#006680", pl: 7 }} >
          <Flex >
          <Box
            mt={isDesktop ? '1' : '3'}
            fontWeight='semibold'
            fontSize={isDesktop ? 24 : 14}
            fontFamily={'FrizQuadrata'}
            fontStyle={'italic'}
            as='h4'
            lineHeight='tight'
            color={'white'}
          >
            {champion.name.toUpperCase()}
          </Box>
          <Spacer />
          <Box
            mt='2'
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize={isDesktop ? 'xl' : 's'}
            textTransform='uppercase'
            mr='2'
          >
            {champion.ratings[champion.main]}
          </Box>
          <Box
            mt='2'
          >
            {renderIcon(champion.main, isDesktop ? 7 : 5)}
          </Box>
          </Flex>
        </Box>
      </Box>
      <ChampionModal
        isOpen={isOpen}
        onClose={onClose}
        champion={champion}
      ></ChampionModal>
      </>
    )
  }