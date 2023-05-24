import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDog, getTemperament } from '../../redux/actions/index';
import './create.css'


function validate(input){

    let errors = {};
    if(!input.name.trim()) { 
        errors.name = 'Write a name, please'; 
    }else if(parseInt(input.name)){
        errors.name = 'Name is invalid, please use at least one letter at the beginning'
    }
    if(!input.image) {
        errors.image = 'Upload an image, please';  
    }
    if(!input.temperament) {
        errors.temperament = 'Select one or more temperaments, please';
    }
    if(input.heightMin < 0 || input.heightMin > 100){
        errors.heightMin = 'Require field, please write a valid number between 1 and 100'
    }
    if(input.heightMax < 1 || input.heightMax > 100){
        errors.heightMax = 'Require field, please write a valid number between 1 and 100'
    }
    if(input.heightMax < input.heightMin){
        errors.heightMin = 'The minimum value cannot be greater than the maximum value'
    }

    if(input.weightMin < 0 || input.weightMin > 100){
        errors.weightMin = 'Require field, please write a valid number between 1 and 100'
    }
    if(input.weightMax < 1 || input.weightMax > 100){
        errors.weightMax = 'Require field, please write a valid number between 1 and 100'    
    }
    if(input.weightMax < input.weightMin){
        errors.weightMin = 'The minimum value cannot be greater than the maximum value'
    }
    if(input.lmin < 0 || input.lmin > 19){
        errors.lmin = 'Require field, please write a valid number between 1 and 19'
    }
    if(input.lmax < 0 || input.lmax > 19){
        errors.lmax = 'Require field, please write a valid number between 1 and 19'
    }
    if(input.lmax < 10 && input.lmax < input.lmin){
        errors.lmin = 'The minimum value cannot be greater than the maximum value'
    }
    return errors;
}



export default function DogCreate(){
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    const temperament = useSelector((state) => state.temperament) 
    const [errors, setErrors] = useState({});
    const[input, setInput] = useState({
        name: '',
        image: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lmin: '',
        lmax: '',
        temperament: []
    });
function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }));
    console.log(input)
} 
function handleSelectTemperament(e){
    setInput({
        ...input,
        temperament: [...input.temperament, e.target.value], 
    })
}
function handleSubmit(e){ 
    e.preventDefault();
    setErrors(
        validate({
            ...input,
            [e.target.name]: e.target.value,
        })
    );
    if(!Object.keys(errors).length && input.name && input.image && input.heightMin && input.heightMax && input.weightMin && input.weightMax && input.lmin && input.lmax && input.temperament){
    
    input.heightMax += ' cm'
    input.weightMax += ' kgs'
    input.life_span = input.lmin + ' - ' + input.lmax + ' years'
    dispatch(postDog(input));
    alert('Dog created successfully')
    setInput({
        name: '',
        image: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lmin: '',
        lmax: '',
        temperament: []
    })
}else {
    alert('Dog not created...');
    return;
}
    navigate('/home')
}

function  handleDelete(el){
    setInput({
        ...input, 
        temperament: input.temperament.filter( temp => temp !==el)
    })
}
    useEffect(() => {
        dispatch(getTemperament());  
    }, [dispatch]);


    return (
       
        <div className='fondo_2'>
            <div className='container'>
            <Link as={Link} to= '/home'><button className='homeBtn'>HOME</button></Link>
            <h1>Dog Create</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                <input className='input'
                    placeholder='Dog Name'
                    type= 'text'
                    value= {input.name}
                    name= 'name'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Image'
                    type= 'img'
                    value= {input.image}
                    name= 'image'
                    alt= 'not found'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}    
                </div>
                <div>
                    <input className='input'
                    placeholder='Min height'
                    type= 'number'
                    value= {input.heightMin}
                    name= 'heightMin'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.heightMin && (
                        <p className='error'>{errors.heightMin}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Max height'
                    type= 'number'
                    value= {input.heightMax}
                    name= 'heightMax'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.heightMax && (
                        <p className='error'>{errors.heightMax}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Min weight'
                    type= 'number'
                    value= {input.weightMin}
                    name= 'weightMin'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.weightMin && (
                        <p className='error'>{errors.weightMin}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Max weight'
                    type= 'number'
                    value= {input.weightMax}
                    name= 'weightMax'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.weightMax && (
                        <p className='error'>{errors.weightMax}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Min life years'
                    type= 'number'
                    value= {input.lmin}
                    name= 'lmin'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.lmin && (
                        <p className='error'>{errors.lmin}</p>
                    )}
                </div>
                <div>
                    <input className='input'
                    placeholder='Max life years'
                    type= 'number'
                    value= {input.lmax}
                    name= 'lmax'
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.lmax && (
                        <p className='error'>{errors.lmax}</p>
                    )}
                </div>
                <label> Temperaments </label>
                <select onChange={(e) => handleSelectTemperament(e)}>
                {errors.temperament && (
                        <p className='error'>{errors.temperament}</p>
                    )} 
                {temperament.map(t => (
                        <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                </select>
                <div>
                    <button className='create' type='submit'>CREATE</button>
                </div>
            </form>
            {input.temperament.map(el => 
                <ul className='input_temperament'key={el}>
                  <li>
                    <p>{el}</p>
                    <button className='x' onClick={() => handleDelete(el)}>X</button>
                  </li>
                </ul>    
                    )}
        </div>
        </div>
    )
}  