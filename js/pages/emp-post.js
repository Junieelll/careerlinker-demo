/* js/pages/emp-post.js */
window.CL = window.CL || {};
window.CL.pages = window.CL.pages || {};

CL.pages['emp-post'] = {
  render() {
    return `
    <div class="max-w-3xl mx-auto px-8 py-8">
      <div class="mb-6">
        <h1 class="page-title mb-1">Post a Job</h1>
        <p class="muted">Fill in the details to attract the right candidates</p>
      </div>

      <div class="space-y-5">

        <div class="card p-6">
          <p class="section-title mb-5">Job Details</p>
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2">
              <label class="form-label">Job Title *</label>
              <input class="form-input" type="text" placeholder="e.g. Senior Frontend Developer">
            </div>
            <div>
              <label class="form-label">Category *</label>
              ${CL.dropdown({ id:'post-cat', placeholder:'Select category',
                options:[
                  { value:'Technology',       label:'Technology',        icon:'squares-2x2'    },
                  { value:'BPO / Call Center',label:'BPO / Call Center', icon:'chat-bubble'    },
                  { value:'Design & Creative',label:'Design & Creative', icon:'pencil-square'  },
                  { value:'Marketing',        label:'Marketing',         icon:'chart-bar'      },
                  { value:'Finance',          label:'Finance',           icon:'currency-dollar' },
                  { value:'Sales',            label:'Sales',             icon:'briefcase'      },
                  { value:'Admin & HR',       label:'Admin & HR',        icon:'users'          },
                ]})}
            </div>
            <div>
              <label class="form-label">Employment Type *</label>
              ${CL.dropdown({ id:'post-type', placeholder:'Select type',
                options:[
                  { value:'Full Time',  label:'Full Time',  icon:'briefcase'    },
                  { value:'Part Time',  label:'Part Time',  icon:'clock'        },
                  { value:'Freelancer', label:'Freelancer', icon:'user'         },
                  { value:'Internship', label:'Internship', icon:'academic-cap' },
                ]})}
            </div>
            <div>
              <label class="form-label">Work Setup *</label>
              ${CL.dropdown({ id:'post-arr', placeholder:'Select setup',
                options:[
                  { value:'On-site', label:'On-site', icon:'building-office' },
                  { value:'Remote',  label:'Remote',  icon:'home'            },
                  { value:'Hybrid',  label:'Hybrid',  icon:'squares-2x2'    },
                ]})}
            </div>
            <div>
              <label class="form-label">Location</label>
              <input class="form-input" type="text" placeholder="e.g. BGC, Taguig City">
            </div>
            <div>
              <label class="form-label">Minimum Salary (₱)</label>
              <input class="form-input" type="number" placeholder="50000">
            </div>
            <div>
              <label class="form-label">Maximum Salary (₱)</label>
              <input class="form-input" type="number" placeholder="80000">
            </div>
          </div>
        </div>

        <div class="card p-6">
          <p class="section-title mb-5">Job Content</p>
          <div class="space-y-4">
            <div>
              <label class="form-label">Job Description *</label>
              <textarea class="form-input" rows="5" placeholder="Describe the role, responsibilities, and what a typical day looks like…"></textarea>
            </div>
            <div>
              <label class="form-label">Requirements *</label>
              <textarea class="form-input" rows="4" placeholder="List qualifications, experience, and skills required…"></textarea>
            </div>
            <div>
              <label class="form-label">Benefits & Perks</label>
              <textarea class="form-input" rows="3" placeholder="HMO, remote work, signing bonus, performance bonus…"></textarea>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <p class="section-title mb-5">Application Settings</p>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="form-label">Application Deadline</label>
              ${CL.datePicker({ id:'post-deadline', placeholder:'Pick a deadline' })}
            </div>
            <div>
              <label class="form-label">Expected Hires</label>
              ${CL.dropdown({ id:'post-hires', placeholder:'Select count',
                options:[
                  { value:'1',  label:'1 person',   icon:'user'  },
                  { value:'2',  label:'2–5 people',  icon:'users' },
                  { value:'5',  label:'5+ people',   icon:'users' },
                ]})}
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button class="btn btn-primary btn-lg" onclick="CL.toast('Job posted successfully')">
            ${CL.icon('arrow-up-tray','w-4 h-4')} Publish Listing
          </button>
          <button class="btn btn-secondary btn-lg" onclick="CL.toast('Saved as draft')">
            Save as Draft
          </button>
          <button class="btn btn-ghost btn-lg" onclick="CL.navigate('emp-jobs')">Cancel</button>
        </div>

      </div>
    </div>`;
  },

  init() {},
};