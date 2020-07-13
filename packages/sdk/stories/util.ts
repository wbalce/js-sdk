export const getValue = id => (<HTMLInputElement>document.getElementById(id))!.value;
export const setValue = (id, value) =>
  ((<HTMLInputElement>document.getElementById(id))!.value = value);

export const updateStatus = message => {
  // The Meeco sdk gives us updates as to which step is running so we can show these to the user.
  if (document.getElementById('status')) {
    document.getElementById('status')!.innerHTML = message;
  }
};

export const setLoading = (isLoading: boolean) => {
  if (isLoading) {
    document.querySelectorAll('button')?.forEach(button => button.classList.add('hidden'));
    document.querySelectorAll('#status')?.forEach(button => button.classList.remove('hidden'));
    document.querySelectorAll('.loader')?.forEach(loader => loader.classList.remove('hidden'));
  } else {
    document.querySelectorAll('button')?.forEach(button => button.classList.remove('hidden'));
    document.querySelectorAll('#status')?.forEach(button => button.classList.add('hidden'));
    document.querySelectorAll('.loader')?.forEach(loader => loader.classList.add('hidden'));
  }
};
