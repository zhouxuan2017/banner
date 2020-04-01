/*global module :true*/
module.exports=function(grunt){
  grunt.initConfig({
    htmlmin:{
      options:{
        collapseWhitespace:true,
        preserveLineBreaks:false
      },
  files:{
    src:'./banner/index.html',
    dest:'./index.html'
  }
  },
  cssmin:{
    './style.css':'./banner/style.css'
  },
  uglify:{
     './main.js':'./banner/main.js'
  },
  imagemin:{
    dist:{
      options:{
         optimizationLevel:3
      },
    
    
    files:[{
      expand:true,
      cwd:'./banner/img/',
      src:['**/*.{png.jpg,jpeg}'],
      dest:'./img/'
    }]
    }
    }
    })
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
 
   grunt.registerTask('default', ['uglify', 'cssmin', 'htmlmin','imagemin']);
};
