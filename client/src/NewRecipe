import React, { Component, MouseEvent, ChangeEvent} from 'react';
import { Recipe } from './recipe';

type NewRecipeProps = {
    onAddGuestClick: (recipe: Recipe) => void;
    onBackClick: () => void;
}

type NewRecipeState = {
    name: string,
    foodType: 'Non-veg' | 'Veg' | '',
    prepTime: number,
    error: string
}

export class NewGuest extends Component<NewRecipeProps, NewRecipeState> {
    constructor(props: NewRecipeProps) {
        super(props);
        this.state = {name: '', foodType: '', prepTime: 0, error: ''};
    }
}


