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

export function ChampionModal({isOpen, onClose, champion}) {
    
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
                        <Text fontSize={'6xl'}>{champion.name.toUpperCase()}</Text>
                        <Text>{champion.blurb}</Text>
                    </VStack>
                    <Spacer></Spacer>
                    <Box width={'50%'} p={'5'} pt={14} pl={12}>
                        <SimpleGrid columns={3} spacing={10}>
                            <Flex direction={'row'}>
                                <Text
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='2xl'
                                    mr='2'
                                >
                                    {champion.ratings.assassin}
                                </Text>
                                <AssassinIcon boxSize={10} color='red.400'></AssassinIcon>
                            </Flex>
                            <Flex direction={'row'}>
                            <Text
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='2xl'
                                    mr='2'
                                >
                                    {champion.ratings.mage}
                                </Text>
                                <MageIcon boxSize={10} color='blue.400'></MageIcon>
                            </Flex>
                            <Flex direction={'row'}>
                            <Text
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='2xl'
                                    mr='2'
                                >
                                    {champion.ratings.tank}
                                </Text>
                                <TankIcon boxSize={10} color='yellow.400'></TankIcon>
                            </Flex>
                            <Flex direction={'row'}>
                            <Text
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='2xl'
                                    mr='2'
                                >
                                    {champion.ratings.fighter}
                                </Text>
                                <FighterIcon boxSize={10} color='orange.400'></FighterIcon>
                            </Flex>
                            <Flex direction={'row'}>
                            <Text
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='2xl'
                                    mr='2'
                                >
                                    {champion.ratings.marksman}
                                </Text>
                                <MarksmanIcon boxSize={10} color='purple.400'></MarksmanIcon>
                            </Flex>
                            <Flex direction={'row'}>
                            <Text
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='2xl'
                                    mr='2'
                                >
                                    {champion.ratings.support}
                                </Text>
                                <SupportIcon boxSize={10} color='green.400'></SupportIcon>
                            </Flex>
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