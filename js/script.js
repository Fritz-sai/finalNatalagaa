/**
 * Main JavaScript File - Frontend Functionality
 * 
 * This file handles:
 * - Mobile navigation toggle
 * - Chatbot functionality
 * - Scroll animations (fade-in effects)
 * - Interactive chatbot conversation flow
 */

// Wait for DOM to be fully loaded before executing JavaScript
// This ensures all HTML elements exist before we try to access them
document.addEventListener('DOMContentLoaded', () => {
    // Get references to navigation toggle button and navigation menu
    // These are used for mobile responsive navigation
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    // Mobile Navigation Toggle: Open/close navigation menu on mobile devices
    if (navToggle && nav) {
        // Add click event listener to the toggle button
        // When clicked, it adds/removes the 'open' class to show/hide the menu
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
        
        // Close navigation menu when clicking outside of it
        // This provides better UX - clicking anywhere else closes the menu
        document.addEventListener('click', (event) => {
            // Check if the click was outside both the nav menu and toggle button
            if (!nav.contains(event.target) && !navToggle.contains(event.target)) {
                // Remove 'open' class to close the menu
                nav.classList.remove('open');
            }
        });
    }

    // Chatbot Toggle: Get references to chatbot elements
    // The chatbot is a help widget that appears on the page
    const chatbot = document.getElementById('chatbot');
    const chatbotToggle = document.getElementById('chatbot-toggle');  // Button to open chatbot
    const chatbotClose = document.getElementById('chatbot-close');    // Button to close chatbot

    // Open Chatbot: Show chatbot when toggle button is clicked
    if (chatbot && chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            // Display chatbot as flex container (visible)
            chatbot.style.display = 'flex';
            // Hide the toggle button since chatbot is now open
            chatbotToggle.style.display = 'none';
        });
    }

    // Close Chatbot: Hide chatbot when close button is clicked
    if (chatbot && chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            // Hide the chatbot
            chatbot.style.display = 'none';
            // Show the toggle button again so user can reopen it
            chatbotToggle.style.display = 'inline-flex';
        });
    }

    // Scroll Animation: Fade-in effect when elements enter viewport
    // This creates a smooth, professional animation as user scrolls down the page
    
    // Select all elements that should have fade-in animation
    // These are key content sections: hero, features, products, services, cards
    const fadeElements = document.querySelectorAll('.hero, .features article, .product-card, .service-card, .card');
    
    // Create IntersectionObserver to detect when elements enter the viewport
    // IntersectionObserver watches elements and triggers callbacks when they become visible
    const observer = new IntersectionObserver((entries) => {
        // Loop through all observed elements that changed visibility
        entries.forEach((entry) => {
            // Check if element is now intersecting (visible in viewport)
            if (entry.isIntersecting) {
                // Add 'is-visible' class to trigger CSS fade-in animation
                entry.target.classList.add('is-visible');
                // Stop observing this element after animation (performance optimization)
                // No need to keep watching once it's been animated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2  // Trigger when 20% of element is visible (prevents premature triggering)
    });

    // Apply fade-in class and start observing each element
    fadeElements.forEach((el) => {
        // Add 'fade-in' class for initial CSS styling (element starts invisible)
        el.classList.add('fade-in');
        // Start observing this element - callback will fire when it enters viewport
        observer.observe(el);
    });

    // Chatbot Conversation Flow: Interactive help system
    // Get references to chatbot body (message container) and choices container
    const chatbotBody = document.querySelector('.chatbot-body');
    const chatChoices = document.getElementById('chat-choices');
    
    // Initialize chatbot conversation system
    if (chatbotBody && chatChoices) {
        /**
         * Conversation Flow Configuration
         * 
         * This object defines all possible conversation states and paths
         * Each state has:
         * - message: Bot's response text
         * - choices: Array of buttons/options user can click
         *   - text: Button label
         *   - value: State identifier
         *   - icon: Emoji icon for visual appeal
         *   - link: Optional - direct link to a page instead of another state
         */
        const conversationFlow = {
            initial: {
                message: 'Hello! 👋 I\'m here to help. What can I assist you with today?',
                choices: [
                    { text: 'Book a Repair', value: 'repair', icon: '🔧' },
                    { text: 'Browse Products', value: 'products', icon: '🛍️' },
                    { text: 'Check Services', value: 'services', icon: '⚙️' },
                    { text: 'Contact Info', value: 'contact', icon: '📞' }
                ]
            },
            repair: {
                message: 'Great! I can help you book a repair. What issue are you experiencing?',
                choices: [
                    { text: 'Screen Broken/Cracked', value: 'repair_screen', icon: '📱' },
                    { text: 'Battery Issues', value: 'repair_battery', icon: '🔋' },
                    { text: 'Water Damage', value: 'repair_water', icon: '💧' },
                    { text: 'Charging Port', value: 'repair_charging', icon: '🔌' },
                    { text: 'Other Issue', value: 'repair_other', icon: '❓' },
                    { text: '← Back', value: 'back_initial', icon: '←' }
                ]
            },
            repair_screen: {
                message: 'Screen repair is one of our most common services! 💪 Our certified technicians use premium glass replacements. You can book a screen repair appointment now.',
                choices: [
                    { text: 'Book Screen Repair', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: 'View Pricing', value: 'view_pricing_screen', icon: '💰' },
                    { text: '← Back', value: 'back_repair', icon: '←' }
                ]
            },
            repair_battery: {
                message: 'Battery issues are frustrating! 🔋 We offer genuine battery replacements that restore your phone\'s battery life. Most battery replacements take about 1-2 hours.',
                choices: [
                    { text: 'Book Battery Repair', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: 'View Pricing', value: 'view_pricing_battery', icon: '💰' },
                    { text: '← Back', value: 'back_repair', icon: '←' }
                ]
            },
            repair_water: {
                message: 'Water damage needs immediate attention! 💧 Our technicians use ultrasonic cleaning and advanced diagnostics to revive water-damaged devices. Book as soon as possible for best results.',
                choices: [
                    { text: 'Book Water Damage Repair', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: 'Emergency? Call Now', value: 'contact', icon: '📞' },
                    { text: '← Back', value: 'back_repair', icon: '←' }
                ]
            },
            repair_charging: {
                message: 'Charging port issues? 🔌 We can fix loose or unresponsive charging ports and restore fast charging capabilities.',
                choices: [
                    { text: 'Book Charging Port Repair', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: 'View Pricing', value: 'view_pricing_charging', icon: '💰' },
                    { text: '← Back', value: 'back_repair', icon: '←' }
                ]
            },
            repair_other: {
                message: 'No problem! We handle various phone issues. 📱 You can book a repair and describe your specific issue in the booking form. Our technicians will assess and fix it.',
                choices: [
                    { text: 'Book Repair (General)', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: 'View All Services', value: 'services', icon: '⚙️' },
                    { text: '← Back', value: 'back_repair', icon: '←' }
                ]
            },
            products: {
                message: 'Explore our accessories! 🛍️ We have premium cases, screen protectors, chargers, and more.',
                choices: [
                    { text: 'View All Products', value: 'action_shop', link: 'shop.php', icon: '🛒' },
                    { text: 'Screen Protectors', value: 'products_screen', icon: '📱' },
                    { text: 'Phone Cases', value: 'products_cases', icon: '💼' },
                    { text: 'Chargers & Cables', value: 'products_chargers', icon: '🔌' },
                    { text: '← Back', value: 'back_initial', icon: '←' }
                ]
            },
            products_screen: {
                message: 'Screen protectors keep your device safe! 📱 We offer premium tempered glass protectors that maintain crystal-clear clarity while protecting against scratches and cracks.',
                choices: [
                    { text: 'Shop Screen Protectors', value: 'action_shop', link: 'shop.php', icon: '🛒' },
                    { text: '← Back', value: 'back_products', icon: '←' }
                ]
            },
            products_cases: {
                message: 'Protect your phone in style! 💼 Our cases combine durability with sleek design. Choose from various styles and materials.',
                choices: [
                    { text: 'Shop Phone Cases', value: 'action_shop', link: 'shop.php', icon: '🛒' },
                    { text: '← Back', value: 'back_products', icon: '←' }
                ]
            },
            products_chargers: {
                message: 'Fast and reliable charging solutions! 🔌 We stock high-quality chargers and cables that support fast charging and are built to last.',
                choices: [
                    { text: 'Shop Chargers & Cables', value: 'action_shop', link: 'shop.php', icon: '🛒' },
                    { text: '← Back', value: 'back_products', icon: '←' }
                ]
            },
            services: {
                message: 'Here are our main services! ⚙️',
                choices: [
                    { text: 'Screen Replacement', value: 'service_screen', icon: '📱' },
                    { text: 'Battery Replacement', value: 'service_battery', icon: '🔋' },
                    { text: 'Water Damage Treatment', value: 'service_water', icon: '💧' },
                    { text: 'View All Services', value: 'action_services', link: 'services.php', icon: '📋' },
                    { text: '← Back', value: 'back_initial', icon: '←' }
                ]
            },
            service_screen: {
                message: 'Screen Replacement: Premium glass with original feel. Most repairs completed in under 2 hours. Starting at $129.99.',
                choices: [
                    { text: 'Book Screen Repair', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: '← Back', value: 'back_services', icon: '←' }
                ]
            },
            service_battery: {
                message: 'Battery Replacement: Genuine batteries that restore performance. Quick 1-2 hour service. Starting at $89.99.',
                choices: [
                    { text: 'Book Battery Repair', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: '← Back', value: 'back_services', icon: '←' }
                ]
            },
            service_water: {
                message: 'Water Damage Treatment: Advanced diagnostics and ultrasonic cleaning. Starting at $149.99.',
                choices: [
                    { text: 'Book Water Damage Repair', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: '← Back', value: 'back_services', icon: '←' }
                ]
            },
            contact: {
                message: 'Need to reach us? 📞\n\n📍 Visit us: Store Location\n📧 Email: reboot@gmail.com\n☎️ Phone: 09663978744\n\n⏰ Hours:\nMonday - Saturday: 9 AM - 7 PM\nSunday: 10 AM - 5 PM',
                choices: [
                    { text: 'Visit Contact Page', value: 'action_contact', link: 'contact.php', icon: '📧' },
                    { text: '← Back', value: 'back_initial', icon: '←' }
                ]
            },
            view_pricing_screen: {
                message: 'Screen Replacement Pricing:\n\n📱 Premium Glass: $129.99\n📱 OEM Quality: $149.99\n📱 Same-Day Service: Available\n\nMost repairs completed in under 2 hours!',
                choices: [
                    { text: 'Book Now', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: '← Back', value: 'repair_screen', icon: '←' }
                ]
            },
            view_pricing_battery: {
                message: 'Battery Replacement Pricing:\n\n🔋 Standard Battery: $89.99\n🔋 Extended Life: $109.99\n⏱️ Service Time: 1-2 hours',
                choices: [
                    { text: 'Book Now', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: '← Back', value: 'repair_battery', icon: '←' }
                ]
            },
            view_pricing_charging: {
                message: 'Charging Port Repair Pricing:\n\n🔌 Standard Repair: $79.99\n🔌 Fast Charging Restore: Included\n⏱️ Service Time: 1-2 hours',
                choices: [
                    { text: 'Book Now', value: 'action_booking', link: 'booking.php', icon: '📅' },
                    { text: '← Back', value: 'repair_charging', icon: '←' }
                ]
            }
        };

        /**
         * Back Navigation Map
         * 
         * Maps back button values to their parent conversation states
         * This allows users to navigate backwards in the conversation tree
         */
        const backMap = {
            'back_initial': 'initial',      // Back to main menu
            'back_repair': 'repair',        // Back to repair options
            'back_products': 'products',    // Back to product categories
            'back_services': 'services'     // Back to service categories
        };

        // Track current conversation state/step
        let currentStep = 'initial';

        /**
         * Show Step Function
         * 
         * Displays a conversation step by showing bot message and generating choice buttons
         * Handles navigation between conversation states
         * 
         * @param {string} step - The conversation step identifier to display
         */
        function showStep(step) {
            // Update current step
            currentStep = step;
            // Get conversation data for this step from conversationFlow object
            const stepData = conversationFlow[step];
            
            // Check if step data exists
            if (!stepData) {
                // Handle action steps (steps that redirect to pages instead of showing messages)
                // Action steps start with 'action_' prefix
                if (step.startsWith('action_')) {
                    // Map action identifiers to their corresponding page URLs
                    const actionMap = {
                        'action_booking': 'booking.php',   // Go to booking page
                        'action_shop': 'shop.php',         // Go to shop page
                        'action_services': 'services.php', // Go to services page
                        'action_contact': 'contact.php'    // Go to contact page
                    };
                    // If action exists, redirect to the page
                    if (actionMap[step]) {
                        window.location.href = actionMap[step];
                    }
                }
                return; // Exit if step not found
            }

            // Add bot message to chat (skip if initial step - message already exists in HTML)
            if (step !== 'initial' && stepData.message) {
                addBotMessage(stepData.message);
            }

            // Clear existing choice buttons and generate new ones
            chatChoices.innerHTML = '';
            // Loop through each choice option for this step
            stepData.choices.forEach(choice => {
                // Create button element for this choice
                const button = document.createElement('button');
                button.className = 'chat-choice-btn';
                // Set button HTML with icon and text
                button.innerHTML = `<span class="choice-icon">${choice.icon || '•'}</span> ${choice.text}`;
                
                // Add click event listener to handle user selection
                button.addEventListener('click', () => {
                    // Check if this choice has a direct link (redirect immediately)
                    if (choice.link) {
                        window.location.href = choice.link;
                    } 
                    // Check if this is a back navigation button
                    else if (backMap[choice.value]) {
                        // Navigate back to the parent conversation state
                        showStep(backMap[choice.value]);
                    } 
                    // Otherwise, navigate forward to a new conversation step
                    else {
                        // Show user's selection as a message
                        addUserMessage(choice.text);
                        // Wait 500ms for visual effect, then show bot's response
                        setTimeout(() => {
                            showStep(choice.value);
                        }, 500);
                    }
                });
                // Add button to choices container
                chatChoices.appendChild(button);
            });

            // Scroll chat to bottom to show latest message
            scrollToBottom();
        }

        /**
         * Add Bot Message
         * 
         * Creates and displays a message from the chatbot
         * 
         * @param {string} message - The bot's message text to display
         */
        function addBotMessage(message) {
            // Create div element for the message
            const messageDiv = document.createElement('div');
            // Add CSS classes for styling (bot messages have different styling than user messages)
            messageDiv.className = 'chat-message bot-message';
            // Set message HTML content, formatting line breaks
            messageDiv.innerHTML = `<div class="message-content">${formatMessage(message)}</div>`;
            // Insert message before the choices container (messages appear above buttons)
            chatbotBody.insertBefore(messageDiv, chatChoices);
            // Scroll to bottom to show new message
            scrollToBottom();
        }

        /**
         * Add User Message
         * 
         * Creates and displays a message from the user
         * This shows what the user selected/typed
         * 
         * @param {string} message - The user's message text to display
         */
        function addUserMessage(message) {
            // Create div element for the message
            const messageDiv = document.createElement('div');
            // Add CSS classes for styling (user messages align to right, bot to left)
            messageDiv.className = 'chat-message user-message';
            // Set message HTML content
            messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
            // Insert message before choices container
            chatbotBody.insertBefore(messageDiv, chatChoices);
            // Scroll to bottom to show new message
            scrollToBottom();
        }

        /**
         * Format Message
         * 
         * Converts plain text message to HTML format
         * Replaces newline characters (\n) with HTML line breaks (<br>)
         * 
         * @param {string} text - Plain text message
         * @return {string} HTML formatted message
         */
        function formatMessage(text) {
            // Convert line breaks (\n) to HTML line breaks (<br>)
            // This allows multi-line messages in the conversation flow to display properly
            return text.replace(/\n/g, '<br>');
        }

        /**
         * Scroll To Bottom
         * 
         * Scrolls the chatbot body to the bottom to show the latest messages
         * Uses setTimeout to ensure DOM updates are complete before scrolling
         */
        function scrollToBottom() {
            // Wait 100ms for DOM updates, then scroll
            setTimeout(() => {
                // Set scroll position to maximum (bottom of chat)
                chatbotBody.scrollTop = chatbotBody.scrollHeight;
            }, 100);
        }

        /**
         * Initialize Chatbot
         * 
         * Sets up the initial chatbot state when page loads
         * The initial bot message is already in the HTML, so we only need to show the choice buttons
         */
        // Get initial conversation data from conversationFlow
        const initialData = conversationFlow.initial;
        // Clear any existing choices (should be empty, but ensures clean state)
        chatChoices.innerHTML = '';
        
        // Create and display initial choice buttons
        initialData.choices.forEach(choice => {
            // Create button element
            const button = document.createElement('button');
            button.className = 'chat-choice-btn';
            // Set button content with icon and text
            button.innerHTML = `<span class="choice-icon">${choice.icon || '•'}</span> ${choice.text}`;
            
            // Add click handler - same logic as in showStep function
            button.addEventListener('click', () => {
                // If choice has direct link, redirect immediately
                if (choice.link) {
                    window.location.href = choice.link;
                } 
                // If it's a back button, go to mapped state (shouldn't happen on initial)
                else if (backMap[choice.value]) {
                    showStep(backMap[choice.value]);
                } 
                // Otherwise, start conversation flow
                else {
                    // Show user's selection
                    addUserMessage(choice.text);
                    // Wait 500ms then show bot's response
                    setTimeout(() => {
                        showStep(choice.value);
                    }, 500);
                }
            });
            // Add button to choices container
            chatChoices.appendChild(button);
        });
    }
});




