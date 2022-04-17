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

const renderIcon = (main) => {
  switch (main) {
    case "assassin": {
      return <AssassinIcon boxSize={7} color='red.400'></AssassinIcon>
    }
    case "fighter": {
      return <FighterIcon boxSize={7} color='orange.400'></FighterIcon>
    }
    case "tank": {
      return <TankIcon boxSize={7} color='yellow.400'></TankIcon>
    }
    case "mage": {
      return <MageIcon boxSize={7} color='blue.400'></MageIcon>
    }
    case "marksman": {
      return <MarksmanIcon boxSize={7} color='purple.400'></MarksmanIcon>
    }
    case "support": {
      return <SupportIcon boxSize={7} color='green.400'></SupportIcon>
    }
    default: {
      return  <SupportIcon boxSize={7}></SupportIcon>
    }
  }
}

export default function ChampionCard({ champion }) {
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
            mt='1'
            fontWeight='semibold'
            fontSize={24}
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
            fontSize='xl'
            textTransform='uppercase'
            mr='2'
          >
            {champion.ratings[champion.main]}
          </Box>
          <Box
            mt='2'
          >
            {renderIcon(champion.main)}
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