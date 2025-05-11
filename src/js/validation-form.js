
const inputs = document.querySelectorAll('.form-control');
const selects = document.querySelectorAll('.form-select');
const selectedGroup = selects[0]

const buttonSend = document.getElementById('button-send')

const fields = {
    name  : false,
    phone : false,
    email : false,
    selected_group : false,
}

const expression = {
    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios
    phone: /^\d{6,20}$/, // 6 a 20 números
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}


const validarSelectGroup = (e) => {
    const value = e.target.value;
const validateValue = [
  'Productor agricultor', 
  'Faena',
  'Carnicería',
  'Horeca',
  'Alimentación',
  'Institucional',
  'Retail',
  'Minimarket',
  'Otro'
];
    const isValid = validateValue.includes(value)
    if(isValid){
        fields['selected_group'] = true;
        e.target.className = 'mt-1.5 w-full form-select rounded-lg bg-white border-gray-300 text-primary sm:text-sm px-5 py-2.5 border border-lime-500'
    } else {
        fields['selected_group'] = false;
        e.target.className = 'mt-1.5 w-full form-select rounded-lg bg-white border-gray-300 text-primary sm:text-sm px-5 py-2.5 border border-red-500 '
    }
    if(value === 'Other'){
        fields.is_observation = true;
        document.getElementById('wrapper-input-observation').classList.remove('c-form__observation-none');
        document.getElementById('wrapper-input-observation').classList.add('c-form__observation-block');
    } else {
        fields.is_observation = false;
        document.getElementById('wrapper-input-observation').classList.add('c-form__observation-none');
        document.getElementById('wrapper-input-observation').classList.remove('c-form__observation-block');
    }
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "name":
            validarCampo(expression.name, e.target, e.target.name)
        break;
        case "organization":
            validarCampo(expression.organization, e.target, e.target.name)
        break;
        case "position":
            validarCampo(expression.position, e.target, e.target.name)
        break;
        case "email":
            validarCampo(expression.email, e.target, e.target.name)
        break;
        case "phone":
            validarCampo(expression.phone, e.target, e.target.name)
        break;
        case "observation":
            validarCampo(expression.observation, e.target, e.target.name)
        break;
    }
}

const validarCampo = (expresion, input, field) => {
    console.log(expresion.test(input.value))
    if(expresion.test(input.value)){
        document.getElementById(`input-${field}`).classList.remove('form-control');
        document.getElementById(`input-${field}`).classList.remove('border-red-500');
        document.getElementById(`input-${field}`).classList.add('form-control');
        document.getElementById(`input-${field}`).classList.add('border-lime-500');
        document.getElementById(`help-${field}`).classList.remove('text-red-500');
        document.getElementById(`help-${field}`).classList.add('text-gray-600');
        fields[field] = true;

    } else {
        document.getElementById(`input-${field}`).classList.remove('form-control');
        document.getElementById(`input-${field}`).classList.remove('border-lime-500');
        document.getElementById(`input-${field}`).classList.add('form-control');
        document.getElementById(`input-${field}`).classList.add('border-red-500');
        document.getElementById(`help-${field}`).classList.remove('text-gray-600');
        document.getElementById(`help-${field}`).classList.add('text-red-500');
        fields[field] = false;
        // document.getElementById(`input-${field}`).classList.add('form-control is-invalid');
        // document.getElementById(`input-${field}`).classList.remove('form-control is-valid');
        // document.getElementById(`wrapper-${field}`).classList.add('c-form-page__wrapper-form-incorrect');
        // document.getElementById(`wrapper-${field}`).classList.add('c-form-page__wrapper-form-correct');
        // document.querySelector(`#wrapper-${field} i`).classList.add('fa-times-circle');
        // document.querySelector(`#wrapper-${field} i`).classList.remove('fa-check-circle');
        // document.querySelector(`#wrapper-${field} .c-form-page__input-error`).classList.add('c-form-page__input-error-active');
    }
}

const validateButton = () => {
if(fields.name && fields.email && fields.phone && fields.selected_group){
    buttonSend.removeAttribute("disabled");
    buttonSend.classList.remove('bg-white', 'opacity-50', 'pointer-events-none', 'cursor-not-allowed');
    buttonSend.classList.add('bg-lime-400', 'hover:bg-lime-500', 'cursor-pointer');
} else {
    buttonSend.setAttribute("disabled", "");
    buttonSend.classList.remove('bg-lime-400', 'hover:bg-lime-500', 'cursor-pointer');
    buttonSend.classList.add('bg-white', 'opacity-50', 'pointer-events-none', 'cursor-not-allowed');
}

    }


inputs.forEach((input)=>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    input.addEventListener('blur', validateButton);
    input.addEventListener('keyup', validateButton);
});

selectedGroup.addEventListener('blur', validarSelectGroup);
selectedGroup.addEventListener('change', validarSelectGroup);
selectedGroup.addEventListener('blur', validateButton);
selectedGroup.addEventListener('change', validateButton);