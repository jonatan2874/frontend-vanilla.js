import {navbar} from '../navbar/navbar.js';

const content = () => {
    let content = `<!-- Content Wrapper -->
                    <div id="content-wrapper" class="d-flex flex-column">

                        <!-- Main Content -->
                        <div id="content">
                            ${navbar()}
                        <!-- End of Topbar -->

                        <!-- Begin Page Content -->
                        <div class="container-fluid" id="main-content" data-spy="scroll" data-offset="0" >
                            <h1 class="h3 mb-4 text-gray-800">Seleccione un modulo</h1>
                        
                        </div>
                        <!-- /.container-fluid -->

                    </div>
                    <!-- End of Main Content -->

                    <!-- Footer -->
                    <footer class="sticky-footer bg-white">
                        <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; Jonatan S. Herran Arias 2020</span>
                        </div>
                        </div>
                    </footer>
                    <!-- End of Footer -->

        </div>`;
    
        return content;
}

export {content};