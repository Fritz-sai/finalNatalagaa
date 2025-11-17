/**
 * Customer Orders Page JavaScript
 * 
 * Handles:
 * - View proof modal functionality
 * - Modal open/close interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    const viewProofModal = document.getElementById('viewProofModal');
    const viewProofButtons = document.querySelectorAll('.view-proof-btn');
    const modalClose = document.querySelector('#viewProofModal .modal-close');
    
    /**
     * Star Rating Interaction
     * 
     * Provides interactive star rating system with visual feedback
     * Users can hover over stars to preview rating, then click to select
     */
    // Find all rating input containers on the page (one per review form)
    document.querySelectorAll('.rating-input').forEach(ratingInput => {
        // Get all star label elements (clickable star containers)
        const starLabels = ratingInput.querySelectorAll('.star-label');
        // Get all radio button inputs (hidden inputs that store the actual rating value)
        const inputs = ratingInput.querySelectorAll('input[type="radio"]');
        // Get the rating text element that displays rating description
        const ratingText = ratingInput.querySelector('.rating-text');
        
        /**
         * Update Stars Display
         * 
         * Updates the visual appearance of stars based on selected rating
         * Filled stars are colored gold, unfilled stars are gray
         * 
         * @param {number} selectedIndex - The rating value (1-5) to display
         */
        const updateStars = (selectedIndex) => {
            // Loop through each star label
            starLabels.forEach((label, index) => {
                // Get the star element inside the label
                const star = label.querySelector('.star');
                // Calculate star value (1-based index, so index 0 = star 1, index 1 = star 2, etc.)
                const starValue = index + 1; // 1-5
                
                // If this star is part of the selected rating, highlight it
                if (starValue <= selectedIndex) {
                    // Color star gold and slightly scale it up for visual feedback
                    star.style.color = '#fbbf24';
                    star.style.transform = 'scale(1.1)';
                } else {
                    // Gray out unselected stars and reset scale
                    star.style.color = '#d1d5db';
                    star.style.transform = 'scale(1)';
                }
            });
            
            // Update rating description text based on selected rating
            if (ratingText && selectedIndex > 0) {
                // Array of descriptive text for each rating level
                const ratingLabels = ['', '1 Star - Poor', '2 Stars - Fair', '3 Stars - Good', '4 Stars - Very Good', '5 Stars - Excellent'];
                // Display the text for the selected rating
                ratingText.textContent = ratingLabels[selectedIndex];
                ratingText.style.color = '#374151'; // Dark gray text
            } else if (ratingText) {
                // No rating selected yet, show placeholder text
                ratingText.textContent = 'Select rating';
                ratingText.style.color = '#6b7280'; // Lighter gray for placeholder
            }
        };
        
        // Add event listeners to each star label for interactive behavior
        starLabels.forEach((label, index) => {
            // Calculate which star this is (1-5)
            const starIndex = index + 1; // 1-5
            
            /**
             * Mouse Enter: Hover Preview
             * 
             * When user hovers over a star, show what rating would be selected
             * This provides visual feedback before clicking
             */
            label.addEventListener('mouseenter', () => {
                // Temporarily highlight stars up to the hovered star
                updateStars(starIndex);
            });
            
            /**
             * Mouse Leave: Reset to Selected
             * 
             * When user stops hovering, restore to the actually selected rating
             * If no rating is selected, show all stars as unselected
             */
            label.addEventListener('mouseleave', () => {
                // Find the radio button that is currently checked
                const checked = ratingInput.querySelector('input[type="radio"]:checked');
                if (checked) {
                    // Get the value of the checked radio (the actual selected rating)
                    const checkedIndex = parseInt(checked.value);
                    // Update stars to show the selected rating
                    updateStars(checkedIndex);
                } else {
                    // No rating selected, show all stars as unselected
                    updateStars(0);
                }
            });
            
            /**
             * Click: Select Rating
             * 
             * When user clicks a star, select that rating
             * This updates the hidden radio button and visual display
             */
            label.addEventListener('click', (e) => {
                // Prevent default label behavior
                e.preventDefault();
                // Check the corresponding radio button
                inputs[index].checked = true;
                // Update star display to show selected rating
                updateStars(starIndex);
            });
        });
    });

    // View Proof Button Handlers
    viewProofButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const proofPath = btn.getAttribute('data-proof-path');
            if (proofPath) {
                document.getElementById('proof_viewer_img').src = proofPath;
                openModal(viewProofModal);
            }
        });
    });

    // Modal Close Handler
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            closeModal(viewProofModal);
        });
    }

    // Close modal when clicking outside
    if (viewProofModal) {
        viewProofModal.addEventListener('click', (e) => {
            if (e.target === viewProofModal) {
                closeModal(viewProofModal);
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && viewProofModal.classList.contains('show')) {
            closeModal(viewProofModal);
        }
    });
    
    /**
     * Review Form Submission via AJAX
     * 
     * Handles review form submission without page reload
     * Uses fetch API to submit form data asynchronously
     */
    // Find all review forms on the page (one per order that can be reviewed)
    document.querySelectorAll('.review-form').forEach(form => {
        // Add submit event listener to each form
        form.addEventListener('submit', async (e) => {
            // Prevent default form submission (which would reload the page)
            e.preventDefault();
            
            // Create FormData object from form (contains all form fields including rating and comment)
            const formData = new FormData(form);
            // Get the order ID from form's data attribute (identifies which order this review is for)
            const orderId = form.getAttribute('data-order-id');
            // Get the submit button to update its state during submission
            const submitBtn = form.querySelector('button[type="submit"]');
            // Save original button text to restore later
            const originalText = submitBtn.textContent;
            // Get the review section container (where success message will be shown)
            const reviewSection = document.getElementById('review-section-' + orderId);
            
            // Disable submit button to prevent double submission
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
            
            try {
                // Send form data to server using fetch API
                const response = await fetch('php/handle_reviews.php', {
                    method: 'POST',  // POST request to submit data
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'  // Identify as AJAX request
                    },
                    body: formData  // Send form data
                });
                
                // Parse JSON response from server
                const result = await response.json();
                
                // Check if submission was successful
                if (result.success) {
                    // Show success message in the review section
                    if (reviewSection) {
                        // Replace form with success message
                        reviewSection.innerHTML = `
                            <div style="padding: 1rem; background: #d1fae5; border-radius: 8px; color: #065f46; text-align: center;">
                                <strong>✓ Thank you! Your review has been submitted.</strong>
                            </div>
                        `;
                    }
                    
                    // Show temporary flash message at top-right of screen
                    const flashDiv = document.createElement('div');
                    flashDiv.className = 'flash-message flash-success';
                    flashDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; padding: 1rem 1.5rem; background: #10b981; color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 1000;';
                    flashDiv.textContent = '✓ Review submitted successfully!';
                    document.body.appendChild(flashDiv);
                    
                    // Remove flash message after 3 seconds with fade-out animation
                    setTimeout(() => {
                        flashDiv.style.opacity = '0';
                        flashDiv.style.transition = 'opacity 0.3s ease';
                        setTimeout(() => flashDiv.remove(), 300);
                    }, 3000);
                } else {
                    // Show error message if submission failed
                    alert(result.error || 'Failed to submit review. Please try again.');
                    // Re-enable submit button so user can try again
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            } catch (error) {
                // Handle network errors or other exceptions
                console.error('Review submission error:', error);
                alert('An error occurred while submitting your review. Please try again.');
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    });
});

/**
 * Open Modal Function
 * 
 * Displays a modal dialog by adding 'show' class and preventing background scrolling
 * 
 * @param {HTMLElement} modal - The modal element to open
 */
function openModal(modal) {
    if (modal) {
        // Add 'show' class which triggers CSS animation to display modal
        modal.classList.add('show');
        // Prevent body from scrolling when modal is open (better UX)
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Close Modal Function
 * 
 * Hides a modal dialog by removing 'show' class and restoring background scrolling
 * 
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
    if (modal) {
        // Remove 'show' class which triggers CSS animation to hide modal
        modal.classList.remove('show');
        // Restore body scrolling when modal is closed
        document.body.style.overflow = '';
    }
}

