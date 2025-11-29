import { useEffect, useState, type ChangeEvent } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import type { FoodData } from '../../interface/FoodData';
import "./modal.css";

interface InputProps {
  label: string;
  value: string | number;
  updateValue: (value: string | number) => void;
}

interface ModalProps {
  closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  const inputType = label === 'price' ? 'number' : 'text';
  const inputId = `input-${label}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateValue(e.target.value);
  };

  return (
    <div className="input-group">
      <label htmlFor={inputId} className="input-label">
        {label === 'title' ? 'Título' : label === 'price' ? 'Preço (R$)' : 'URL da Imagem'}
      </label>
      <input
        id={inputId}
        type={inputType}
        value={value}
        onChange={handleChange}
        className="input-field"
        min={label === 'price' ? '0.01' : undefined}
        step={label === 'price' ? '0.01' : undefined}
        required
        aria-required="true"
      />
    </div>
  );
};

export function CreateModal({ closeModal }: ModalProps) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  const { mutate, isSuccess, isPending, error } = useFoodDataMutate();

  const validateForm = (): boolean => {
    if (!title.trim()) {
      setFormError('O título é obrigatório');
      return false;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setFormError('O preço deve ser maior que zero');
      return false;
    }

    if (!image.trim()) {
      setFormError('A URL da imagem é obrigatória');
      return false;
    }

    try {
      new URL(image.trim());
    } catch {
      setFormError('Por favor, insira uma URL válida para a imagem');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateForm()) return;

    const newFood: Omit<FoodData, 'id'> = {
      title: title.trim(),
      price: parseFloat(price),
      image: image.trim(),
    };

    mutate(newFood);
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle('');
      setPrice('');
      setImage('');
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-body">
        <div className="modal-header">
          <h2 id="modal-title">Cadastre um novo item no cardápio</h2>
          <button 
            type="button" 
            className="close-button" 
            onClick={closeModal}
            aria-label="Fechar modal"
            disabled={isPending}
          >
            &times;
          </button>
        </div>
        
        {formError && (
          <div className="error-message" role="alert">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <Input 
            label="title" 
            value={title} 
            updateValue={setTitle}
          />
          
          <Input 
            label="price" 
            value={price}
            updateValue={setPrice}
          />
          
          <Input 
            label="image" 
            value={image} 
            updateValue={setImage}
          />

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-cancel"
              onClick={closeModal}
              disabled={isPending}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn btn-submit"
              disabled={isPending}
              aria-busy={isPending}
            >
              {isPending ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message" role="alert">
            Erro ao adicionar item: {error instanceof Error ? error.message : 'Tente novamente mais tarde.'}
          </div>
        )}
      </div>
    </div>
  );
}