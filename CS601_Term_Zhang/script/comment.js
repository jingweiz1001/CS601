
const url_read = "https://api.jsonbin.io/v3/b/648ebfbbb89b1e2299b0ee9b/latest?meta=false"
const url_write = "https://api.jsonbin.io/v3/b/648ebfbbb89b1e2299b0ee9b?meta=false"

const app = Vue.createApp({
    data() {
      return {
        projects:[],
        project:{name:"", comment:""},
        content:{listForm:true, addForm:false}
      }
    },
    methods: {
        showList() {
            this.content.listForm = true;
            this.content.addForm = false;
        },
        showForm() {
            this.content.listForm = false;
            this.content.addForm = true;
        },

        fetchData() {
            fetch(url_read)
            .then(res => res.json())
            .then(data => this.projects = data)
            .catch(err => this.handleError(err));
        },
        handleError(err) {
            alert(err);
        },
        doDelete(project) {
            this.projects.splice(this.projects.indexOf(project), 1);
            let data = this.projects.filter(p => p !== project);
            if (data.length == 0) {
                data = [{name:'Hi everyone', comment:'Welcome to submit comment!'}];
            }
                fetch(url_write, {method:'PUT',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify(data),
                })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => this.handleError(err));
            
        },
        doPost() {
            if (!this.validate()) {
                return false;
            }
            this.projects.push(this.project);
            fetch(url_write, {
                method:"PUT",
                body: JSON.stringify(this.projects),
                headers:{
                    'Content-Type':"application/json",
                }
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => this.handleError(err));
            this.project.name = '';
            this.project.comment = '';
            alert('Submission complete!');
            this.fetchData();
        },
        reset() {
            this.project.name = '';
            this.project.comment = '';
        },
        validate() {
            if (this.project.name.length < 2 || this.project.comment.length < 2) {
                alert("Please type the correct name and comment!");
                return false;
            }
            return true;
        }
    },
    mounted() {
        this.fetchData();
    }
  })
 app.mount('#app')
