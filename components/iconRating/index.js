

import { Flex, Text } from '@chakra-ui/react'

export default function IconRating ({ rating, children }) {
    return (
      <>
       <Flex direction={'row'}>
            <Text
                color='gray.500'
                fontWeight='semibold'
                letterSpacing='wide'
                fontSize='2xl'
                mr='2'
            >
                {rating}
            </Text>
            {children}
        </Flex>
      </>
    )
  }