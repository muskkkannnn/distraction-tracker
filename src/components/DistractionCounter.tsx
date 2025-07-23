import React, { useState } from 'react';
import {
  Box,
  VStack,
  Button,
  ButtonText,
  Heading,
  Center,
  Circle,
  Text,
  HStack
} from '@gluestack-ui/themed';
import * as Haptics from 'expo-haptics';
import { useDistractionContext } from '../store/DistractionContext';
import { Text as RNText } from 'react-native';

const DistractionCounter: React.FC = () => {
  const { distractionCount, addToCount, resetCount, lastUpdated } = useDistractionContext();
  const [quantity, setQuantity] = useState<number>(1);
  const [showResetSuccess, setShowResetSuccess] = useState<boolean>(false);
  const [showAddSuccess, setShowAddSuccess] = useState<boolean>(false);

  const handleIncrement = () => {
    if (quantity < 9) {
      setQuantity(quantity + 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleAddDistractions = () => {
    addToCount(quantity);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 1500);
  };

  const handleResetCount = () => {
    resetCount();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setShowResetSuccess(true);
    setTimeout(() => setShowResetSuccess(false), 1500);
  };

  // Format last updated time for display
  const formattedLastUpdated = lastUpdated 
    ? `Last updated: ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : '';

  return (
    <VStack space="lg" alignItems="center" width="100%" padding="$4">
      {/* Main Counter Display */}
      <Box>
        <Heading size="2xl" mb="$2" textAlign="center">Daily Distractions</Heading>
        <Center>
          <Circle size="$32" bg="$primary100">
            <Heading size="4xl" color="$primary600">{distractionCount}</Heading>
          </Circle>
        </Center>
        
        {lastUpdated && (
          <Text fontSize="$xs" color="$secondary600" textAlign="center" mt="$1">
            {formattedLastUpdated}
          </Text>
        )}
        
        {/* Success messages */}
        {showAddSuccess && (
          <Text fontSize="$sm" color="$success600" textAlign="center" mt="$2">
            Distraction{quantity > 1 ? 's' : ''} added!
          </Text>
        )}
        
        {showResetSuccess && (
          <Text fontSize="$sm" color="$success600" textAlign="center" mt="$2">
            Counter reset!
          </Text>
        )}
      </Box>

      {/* Quantity Selector */}
      <Box my="$4" width="100%">
        <HStack space="md" alignItems="center" justifyContent="center">
          <Button
            variant="outline"
            size="lg"
            borderRadius="$full"
            onPress={handleDecrement}
            isDisabled={quantity <= 1}
            accessibilityLabel="Decrease quantity"
          >
            <ButtonText>-</ButtonText>
          </Button>
          
          <Box width="$12" alignItems="center">
            <Heading size="2xl">{quantity}</Heading>
          </Box>
          
          <Button
            variant="outline"
            size="lg"
            borderRadius="$full"
            onPress={handleIncrement}
            isDisabled={quantity >= 9}
            accessibilityLabel="Increase quantity"
          >
            <ButtonText>+</ButtonText>
          </Button>
        </HStack>
      </Box>

      {/* Add Button */}
      <Button
        size="lg"
        width="$64"
        variant="solid"
        backgroundColor="$primary500"
        onPress={handleAddDistractions}
        borderRadius="$lg"
      >
        <ButtonText fontSize="$lg">
          {quantity === 1 ? 'Add Distraction' : `Add ${quantity} Distractions`}
        </ButtonText>
      </Button>

      {/* Reset Button */}
      <Button
        size="sm"
        variant="link"
        onPress={handleResetCount}
        mt="$4"
      >
        <ButtonText fontSize="$sm" color="$secondary600">Reset Counter</ButtonText>
      </Button>
    </VStack>
  );
};

export default DistractionCounter; 