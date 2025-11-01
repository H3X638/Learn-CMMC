// sidebar.js - Shared sidebar behavior across all pages
import { logout } from "./firebase.js";

// Initialize sidebar on page load
document.addEventListener('DOMContentLoaded', () => {
	initializeSidebar();
});

function initializeSidebar() {
	// Highlight active page in sidebar
	setActivePage();
	
	// Setup sidebar collapse toggle
	setupSidebarToggle();
	
	// Setup logout button
	setupLogout();
	
	// Add fade-in effect
	document.body.classList.add('loaded');
}

// Highlight the current page in sidebar
function setActivePage() {
	const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
	const navItems = document.querySelectorAll('nav li');
	
	// Remove active class from all items
	navItems.forEach(item => item.classList.remove('active'));
	
	// Add active class based on current page
	if (currentPage === 'dashboard.html' || currentPage === '') {
		document.getElementById('navOverview')?.classList.add('active');
	} else if (currentPage.includes('lesson')) {
		document.getElementById('navOverview')?.classList.add('active');
	} else if (currentPage === 'strengths.html') {
		document.getElementById('navStrengths')?.classList.add('active');
	} else if (currentPage === 'practice.html') {
		document.getElementById('navPractice')?.classList.add('active');
	}
}

// Setup sidebar collapse/expand functionality
function setupSidebarToggle() {
	const sidebar = document.querySelector('.sidebar');
	const toggleBtn = document.getElementById('toggleSidebar');
	
	if (!sidebar || !toggleBtn) return;
	
	// Restore collapsed state from localStorage
	const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
	if (isCollapsed) {
		sidebar.classList.add('collapsed');
		updateToggleIcon(toggleBtn, true);
	}
	
	// Toggle on click
	toggleBtn.addEventListener('click', () => {
		sidebar.classList.toggle('collapsed');
		const collapsed = sidebar.classList.contains('collapsed');
		
		// Save state
		localStorage.setItem('sidebarCollapsed', collapsed);
		
		// Update icon
		updateToggleIcon(toggleBtn, collapsed);
	});
}

// Update the toggle button icon
function updateToggleIcon(button, isCollapsed) {
	const icon = button.querySelector('svg');
	if (!icon) return;
	
	if (isCollapsed) {
		// Right-pointing chevron
		icon.innerHTML = '<polyline points="9 18 15 12 9 6"></polyline>';
	} else {
		// Left-pointing chevron
		icon.innerHTML = '<polyline points="15 18 9 12 15 6"></polyline>';
	}
}

// Setup logout button
function setupLogout() {
	const logoutBtn = document.getElementById('logoutBtn');
	
	if (!logoutBtn) return;
	
	logoutBtn.addEventListener('click', async () => {
		try {
			await logout();
			window.location.href = 'index.html';
		} catch (error) {
			console.error('Logout error:', error);
			alert('Failed to logout. Please try again.');
		}
	});
}

// Optional: Add user info to sidebar
export function updateUserInfo(user) {
	const userDisplay = document.getElementById('userDisplay');
	if (userDisplay && user) {
		userDisplay.textContent = user.email || user.displayName || 'User';
	}
}

// Optional: Add notification badge to sidebar items
export function setBadge(navItemId, count) {
	const navItem = document.getElementById(navItemId);
	if (!navItem || count <= 0) return;
	
	// Remove existing badge
	const existingBadge = navItem.querySelector('.badge');
	if (existingBadge) existingBadge.remove();
	
	// Add new badge
	const badge = document.createElement('span');
	badge.className = 'badge';
	badge.textContent = count;
	navItem.appendChild(badge);
}