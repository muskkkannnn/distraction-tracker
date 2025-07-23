import React, { useState } from 'react';
import { Box, Button, ButtonText, VStack, ScrollView, Text, Heading } from '@gluestack-ui/themed';
import { clearAsyncStorage, setMockAsyncStorage, createYesterdayDate, generateTestReport } from '../utils/testUtils';

const TestScreen: React.FC = () => {
  const [testResults, setTestResults] = useState<string>('');

  const runTests = async () => {
    let results = 'Running tests...\n\n';
    
    // Test 1: Clear data and check empty state
    results += 'Test 1: Clear data and check empty state\n';
    await clearAsyncStorage();
    results += '- AsyncStorage cleared\n';
    results += '- ' + await generateTestReport() + '\n';
    
    // Test 2: Set mock data for today
    results += 'Test 2: Set mock data for today\n';
    await setMockAsyncStorage(5);
    results += '- Mock data set: count=5, date=today\n';
    results += '- ' + await generateTestReport() + '\n';
    
    // Test 3: Set mock data for yesterday (should reset on next app load)
    results += 'Test 3: Set mock data for yesterday\n';
    const yesterday = createYesterdayDate();
    await setMockAsyncStorage(10, yesterday);
    results += `- Mock data set: count=10, date=yesterday (${yesterday.toLocaleDateString()})\n`;
    results += '- ' + await generateTestReport() + '\n';
    results += '- NOTE: This should reset to 0 on next app load\n';
    
    setTestResults(results);
  };
  return (
    <VStack space="md" p="$4" flex={1}>
      <Heading size="lg">DistractionCounter Test Suite</Heading>
      
      <Box flexDirection="row" justifyContent="space-between" mt="$4">
        <Button onPress={runTests} size="md">
  // End of Selection
          <ButtonText>Run Tests</ButtonText>
        </Button>
        
        <Button 
          onPress={async () => await clearAsyncStorage()} 
          size="md" 
          variant="outline"
        >
          <ButtonText>Clear Storage</ButtonText>
        </Button>
      </Box>
      
      <ScrollView flex={1} mt="$4">
        <Box 
          p="$3" 
          borderWidth={1} 
          borderColor="$borderLight300" 
          borderRadius="$md"
          bg="$backgroundLight50"
        >
          <Text fontFamily="$mono">{testResults || 'No test results yet'}</Text>
        </Box>
      </ScrollView>
    </VStack>
  );
};

export default TestScreen; 