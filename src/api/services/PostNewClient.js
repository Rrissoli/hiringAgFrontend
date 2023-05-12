const PostClient = async (name)  => {
    axios.post('/clients', { name: this.nomeCliente })
        .then(response => {
          console.log('Cliente salvo com sucesso:', response.data);
          this.nomeCliente = '';
          this.modalAtivo = false;
        })
        .catch(error => {
          console.error('Erro ao salvar cliente:', error);
        });
}
export default PostNewClient