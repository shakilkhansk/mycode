//-----image_preview---------------
      $('#icon').change(function(){
        const file = this.files[0];
        console.log(file);
        if (file){
          let reader = new FileReader();
          reader.onload = function(event){
            console.log(event.target.result);
            $('#img').attr('src', event.target.result);
          }
          reader.readAsDataURL(file);
        }
      });
//-------------select----------------
        function changeClass(id) {
        $.ajax({
            url: '{{ route('classSection') }}?class_id='+id,
            method: 'GET', // HTTP method (GET, POST, etc.)
            dataType: 'json', // Expected response data type
            success: function (data) {
                console.log(data)
                $('#section_id').empty().append(`<option value="" disabled selected>Select Section *</option>`);
                // Loop through the data and populate the select element with options
                $.each(data, function (key, value) {
                    $('#section_id').append(`<option value="${value.id}">${value.name}</option>`);
                });
                $("#section_id").removeAttr('disabled');
                $("#group_id").removeAttr('disabled');
            },
            error: function (error) {
                console.error('Ajax request error:', error);
            }
        });
        }
//-------------pagination------------
<table id="student-table" class="table table-striped table-responsive data-table2 text-nowrap">
                                <thead>
                                    <tr>
                                        <th>
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input checkAll">
                                                <label class="form-check-label">S.ID</label>
                                            </div>
                                        </th>
                                        <th>Photo</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Roll</th>
                                        <th>Section</th>
                                        <th>Gender</th>
                                        <th>Phone</th>
                                        <th>Parents</th>
                                        <th>Address</th>
                                        <th>Date Of Birth</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
    <tbody>
        <!-- Student data will be appended here -->
    </tbody>
</table>
<div id="totalRecord" class="text-center float-lg-left" style="margin-top: 15px">
</div>
<nav aria-label="Page navigation example" id="paging" class="float-right" style="margin-top: 15px">
  <ul class="pagination">
  </ul>
</nav>
-------------------------------
        function loadPaginatedData(page=1,id=null,name=null,class_id=null,section_id=null) {
        if($("#student_id").val()){
        var id=$("#student_id").val();
        }
        if($("#name").val()){
        var name=$("#name").val();
        }
        if($("#class_id").val()){
        var class_id=$("#class_id").val();
        }
        if($("#section_id").val()){
        var section_id=$("#section_id").val();
        }
            $.ajax({
                url: "{{route('getData')}}?page="+page+"&id="+id+"&name="+name+"&class_id="+class_id+"&section_id="+section_id,
                type: 'GET',
                data: { page: page },
                dataType: 'json',
                success: function (data) {
                // Clear existing data in the student-table div
                var tableBody = $('#student-table tbody');
                var pagingBody = $("#paging ul");
                tableBody.empty(); pagingBody.empty();
                //pagination
                var current = data.current_page;
                var next = current+1;
                var prev = current-1;
                // Iterate through the received student data
                $.each(data.data, function (index, student) {
                    //class
                    if (student && student.class && student.class.name) {
                        var className = student.class.name;
                    } else {
                        var className = "-";
                    }
                    //section
                    if (student && student.section && student.section.name) {
                        var sectionName = student.section.name;
                    } else {
                        var sectionName = "-";
                    }
                    //status
                    if (student && student.status) {
                        var status = '<span class="p-3 badge badge-success">Active</span>';
                    } else {
                        var status = '<span class="p-3 badge badge-danger">Inctive</span>';
                    }
                 var row = `<tr>
                                        <td>
                                            <div class="form-check">
                                                <input type="checkbox" class="form-check-input">
                                                <label class="form-check-label">${student.id}</label>
                                            </div>
                                        </td>
                                        <td class="text-center"><img src="${student.photo}" class="rounded-circle" style="height:30px; width=30px;" alt="photo"></td>
                                        <td>${student.name}</td>
                                        <td>${className}</td>
                                        <td>${student.class_roll}</td>
                                        <td>${sectionName}</td>
                                        <td>${student.gender}</td>
                                        <td>${student.phone}</td>
                                        <td>${student.father_name}</td>
                                        <td>${student.address}</td>
                                        <td>${student.birth_date}</td>
                                        <td>${status}</td>
                                        <td>
                                            <div class="dropdown">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown"
                                                    aria-expanded="false">
                                                    <span class="flaticon-more-button-of-three-dots"></span>
                                                </a>
                                                <div class="dropdown-menu dropdown-menu-right">
                                                    <a class="dropdown-item" href="#"><i
                                                            class="fas fa-times text-orange-red"></i>Close</a>
                                                    <a class="dropdown-item" href="#"><i
                                                            class="fas fa-cogs text-dark-pastel-green"></i>Edit</a>
                                                    <a class="dropdown-item" href="#"><i
                                                            class="fas fa-redo-alt text-orange-peel"></i>Refresh</a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>`;
                    // Add more student attributes as needed
                        tableBody.append(row);
                    // Append the row to the student-table div
                });
                //pagination
                    var pages = '';
                    if(current==1){
                        pages += '<li class="page-item disabled"><a class="page-link" onclick="loadPaginatedData('+prev+')" href="javascript:void(0)">Previous</a></li>'
                    }else {
                        pages += '<li class="page-item"><a class="page-link" onclick="loadPaginatedData('+prev+')" href="javascript:void(0)">Previous</a></li>'
                    }
                    if(current>>2){
                        pages += ('<li class="page-item" id="prev_li"><a class="page-link" id="prev_a" onclick="loadPaginatedData('+(current-2)+')">'+(current-2)+'</a></li>');
                    }
                    if(current>1){
                        pages += ('<li class="page-item" id="prev_li"><a class="page-link" id="prev_a" onclick="loadPaginatedData('+(current-1)+')">'+(current-1)+'</a></li>');
                    }
                        pages += ('<li class="page-item disabled" id="prev_li"><a class="page-link bg-warning text-white" id="prev_a">'+current+'</a></li>');
                    if(data.total/20>1 && Math.ceil(data.total/20)>current){
                        pages += ('<li class="page-item" id="prev_li"><a class="page-link" id="prev_a" onclick="loadPaginatedData('+(current+1)+')">'+(current+1)+'</a></li>');
                    }
                    if(data.total/20>2 && Math.ceil(data.total/20)>(current+2)){
                        pages += ('<li class="page-item" id="prev_li"><a class="page-link" id="prev_a" onclick="loadPaginatedData('+(current+2)+')">'+(current+2)+'</a></li>');
                    }
                    if(current ==  Math.ceil(data.total/20)){
                        pages += ('<li class="page-item disabled"><a class="page-link" onclick="loadPaginatedData('+next+')" href="javascript:void(0)">Next</a></li>');
                    }else {
                        pages += ('<li class="page-item"><a class="page-link" onclick="loadPaginatedData('+next+')" href="javascript:void(0)">Next</a></li>');
                    }
            pagingBody.append(pages);
            $("#totalRecord").html('Showing : '+data.total+' entries');
                },
                error: function () {
                    alert('An error occurred while fetching data.');
                }
            });
        }
