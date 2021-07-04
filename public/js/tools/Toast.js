const showToast = (html) => {
    let toast = document.createElement('div');
    toast.innerHTML = html;
    toast.classList.add('toast','show');
    document.body.append(toast)
    setTimeout(()=> {
      toast.classList.remove('show');
      setTimeout(()=> toast.remove(),1000)
    },3000);
  }