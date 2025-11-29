package com.example.Cardapio.Controller;

import com.example.Cardapio.Food.Food;
import com.example.Cardapio.Food.FoodRepository;
import com.example.Cardapio.Food.FoodRequestDTO;
import com.example.Cardapio.Food.FoodResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("food")
public class FoodController {

    @Autowired 
    private FoodRepository repository;

    @CrossOrigin(origins = "*")
    @PostMapping
    public void saveFood(@RequestBody FoodRequestDTO data){
        Food foodData = new Food(data);
        repository.save(foodData);
    }

    @CrossOrigin(origins = "*")
    @GetMapping
    public List<FoodResponseDTO> getAll(){
        return repository.findAll()
            .stream()
            .map(FoodResponseDTO::new)
            .toList();
    }
}