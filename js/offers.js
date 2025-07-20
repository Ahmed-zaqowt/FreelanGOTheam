 document.addEventListener("DOMContentLoaded", () => {
      // Form submission
      const bidForm = document.getElementById("bidForm");
      bidForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Get form values
        const amount = document.getElementById("bidAmount").value;
        const duration = document.getElementById("bidDuration").value;
        const message = document.getElementById("bidMessage").value;
        const revisions = document.getElementById("revisions").value;
        
        // In a real app, you would send this data to a server
        // For demo, we'll show a success message
        alert(`تم تقديم عرضك بنجاح!\nالقيمة: ${amount}$\nالمدة: ${duration} أيام`);
        
        // Reset form
        bidForm.reset();
      });
      
      // Sort bids
      const sortSelect = document.getElementById("sort");
      sortSelect.addEventListener("change", () => {
        alert(`تم تغيير ترتيب العروض حسب: ${sortSelect.options[sortSelect.selectedIndex].text}`);
        // In a real app, you would re-sort the bids here
      });
      
      // Accept/reject buttons
      document.querySelectorAll(".btn-accept").forEach(btn => {
        btn.addEventListener("click", () => {
          alert("تم قبول العرض بنجاح! سيتم التواصل مع صاحب العرض لإكمال التفاصيل.");
        });
      });
      
      document.querySelectorAll(".btn-reject").forEach(btn => {
        btn.addEventListener("click", () => {
          if(confirm("هل أنت متأكد من رفض هذا العرض؟")) {
            alert("تم رفض العرض.");
          }
        });
      });
    });