import React from 'react';
import { Box, Button, ButtonIcon, Heading, HStack, MinusIcon, PlusIcon } from '@gluestack-ui/themed';

interface QuantitySelectorProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minQuantity?: number;
  maxQuantity?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  minQuantity = 1,
  maxQuantity = 9
}) => {
  return (
    <Box my="$4" width="100%">
      <HStack space="md" alignItems="center" justifyContent="center">
        <Button
          variant="outline"
          size="lg"
          borderRadius="$full"
          onPress={onDecrement}
          isDisabled={quantity <= minQuantity}
          accessibilityLabel="Decrease quantity"
        >
          <ButtonIcon as={MinusIcon} />
        </Button>
        
        <Box width="$12" alignItems="center">
          <Heading size="2xl">{quantity}</Heading>
        </Box>
        
        <Button
          variant="outline"
          size="lg"
          borderRadius="$full"
          onPress={onIncrement}
          isDisabled={quantity >= maxQuantity}
          accessibilityLabel="Increase quantity"
        >
          <ButtonIcon as={PlusIcon} />
        </Button>
      </HStack>
    </Box>
  );
};

export default QuantitySelector; 