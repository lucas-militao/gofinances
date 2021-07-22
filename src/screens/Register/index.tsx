import React, { useState } from 'react';

import { Button } from '../../components/Forms/Button';
import { CategorySelect } from '../../components/Forms/CategorySelect';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';

import { 
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes
} from './styles';

export function Register() {
  const [transactionType, setTransactionType] = useState('');

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome"/>
          <Input placeholder="Preço"/>

          <TransactionsTypes>
            <TransactionTypeButton 
              title="Income" 
              type="up"
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            
            <TransactionTypeButton 
              title="Outcome" 
              type="down"
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelect title="Categoria"/>
        </Fields>

        <Button title="Enviar"/>
      </Form>

    </Container>
  );
}