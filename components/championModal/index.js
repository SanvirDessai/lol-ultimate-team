import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Image,
    Flex,
    SimpleGrid,
    Spacer,
    VStack,
    Text
  } from '@chakra-ui/react'

import {
    AssassinIcon,
    MageIcon,
    TankIcon,
    FighterIcon,
    MarksmanIcon,
    SupportIcon
} from '../roleIcon'

import IconRating from '../iconRating'

import useMediaQuery from "../../hooks/useMediaQuery";

export function ChampionModal({isOpen, onClose, champion}) {

    const isDesktop = useMediaQuery('(min-width: 960px)');
    
    return (
      <>
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            
            size={'6xl'}
        >
          <ModalOverlay />
          <ModalContent
            bg="#061c25"
          >
            <ModalHeader color={'white'}>Champion Detail</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
            <Box>
                <Image src={champion.detailImage} alt={champion.name + ' Detail'} width='100%'/>
                <Box p='6' color={'white'}>

                    <Flex direction={'row'}>

                    <VStack
                        fontFamily={'FrizQuadrata'}
                        fontStyle={'italic'}
                        spacing={2}
                        align='stretch'
                        width={'50%'}
                    >
                        <Text fontSize={'large'}>{champion.title.toUpperCase()}</Text>
                        <Text fontSize={isDesktop ? '6xl' : '3xl'}>{champion.name.toUpperCase()}</Text>
                        <Text>{champion.blurb}</Text> <a target='_blank' href={champion.officialUrl}>SEE MORE</a>
                    </VStack>
                    <Spacer></Spacer>
                    <Box width={'50%'} p={'5'} pt={14} pl={12}>
                        <SimpleGrid columns={isDesktop ? 3 : 1} spacing={10}>
                            <IconRating rating={champion.ratings.assassin}>
                                <AssassinIcon boxSize={10} color='red.400'></AssassinIcon>
                            </IconRating>
                            <IconRating rating={champion.ratings.mage}>
                                <MageIcon boxSize={10} color='blue.400'></MageIcon>
                            </IconRating>
                            <IconRating rating={champion.ratings.tank}>
                                <TankIcon boxSize={10} color='yellow.400'></TankIcon>
                            </IconRating>
                            <IconRating rating={champion.ratings.fighter}>
                                <FighterIcon boxSize={10} color='orange.400'></FighterIcon>
                            </IconRating>
                            <IconRating rating={champion.ratings.marksman}>
                                <MarksmanIcon boxSize={10} color='purple.400'></MarksmanIcon>
                            </IconRating>
                            <IconRating rating={champion.ratings.support}>
                                <SupportIcon boxSize={10} color='green.400'></SupportIcon>
                            </IconRating>
                        </SimpleGrid>
                    </Box>
                    </Flex>

                </Box>
            </Box>
            
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose} bg='#006680'>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }