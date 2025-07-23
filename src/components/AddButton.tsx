import React from 'react';
import { Button, ButtonText } from '@gluestack-ui/themed';

interface AddButtonProps {
  onPress: () => void;
  quantity: number;
}

const AddButton: React.FC<AddButtonProps> = ({ onPress, quantity }) => {
  return (
    <Button
      size="lg"
      width="$64"
      variant="solid"
      backgroundColor="$primary500"
      onPress={onPress}
      borderRadius="$lg"
      accessibilityLabel={`Add ${quantity} distraction${quantity > 1 ? 's' : ''}`}
    >
      <ButtonText fontSize="$lg">
        {quantity === 1 ? 'Add Distraction' : `Add ${quantity} Distractions`}
      </ButtonText>
    </Button>
  );
};

export default AddButton; 