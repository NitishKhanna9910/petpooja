import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPortal from './components/AuthPortal';
import SidebarNav from './components/SidebarNav';
import GuestPortal from './components/GuestPortal';
import WaiterPortal from './components/WaiterPortal';
import KitchenPortal from './components/KitchenPortal';
import CounterPortal from './components/CounterPortal';
import ManagerPortal from './components/ManagerPortal';
import CustomerCrmPortal from './components/CustomerCrmPortal';
import ReservationCrmPortal from './components/ReservationCrmPortal';
import SaasWorkspacePortal from './components/SaasWorkspacePortal';
import AddDishPortal from './components/AddDishPortal';
import FreeCanvasFloorplanBuilder from './components/FreeCanvasFloorplanBuilder';
import StoreOnboardingPortal from './components/StoreOnboardingPortal';
import SuppliersPortal from './components/SuppliersPortal';
import FinancialReportsPortal from './components/FinancialReportsPortal';
import ReceiptModal from './components/ReceiptModal';
import QrFlyerModal from './components/QrFlyerModal';

import {
  INITIAL_OUTLETS,
  STORE_MENUS_MAP,
  INITIAL_DISHES,
  INITIAL_TABLES,
  INITIAL_ORDERS,
  INITIAL_INVENTORY,
  INITIAL_AUDIT_LOGS,
  INITIAL_CUSTOMERS,
  INITIAL_RESERVATIONS,
  SCRATCH_REWARDS
} from './data/mockData';

import {
  INITIAL_WORKSPACES,
  INITIAL_TEAM_MEMBERS
} from './data/mockSaasData';

export default function App() {
  // App Navigation Flow State: ALWAYS default to 'landing' for initial page load!
  const [pageState, setPageState] = useState('landing'); // 'landing' | 'login' | 'app'
  
  // Logged-In User Persona State
  const [currentUser, setCurrentUser] = useState({
    id: 'user-admin',
    name: 'Karan Mathur (Owner)',
    email: 'admin@gssoftwares.com',
    role: 'admin'
  });

  const [activeView, setActiveView] = useState('admin');

  // SaaS Multi-tenant State
  const [workspaces, setWorkspaces] = useState(INITIAL_WORKSPACES);
  const [activeWorkspace, setActiveWorkspace] = useState(INITIAL_WORKSPACES[0]);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM_MEMBERS);

  const [activeOutlet, setActiveOutlet] = useState(INITIAL_OUTLETS[0].name);
  const [selectedTable, setSelectedTable] = useState('Table 04');

  // Shared CRM & Application State
  const [dishes, setDishes] = useState(INITIAL_DISHES);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [tables, setTables] = useState(INITIAL_TABLES);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);

  // Modals
  const [activeReceiptOrder, setActiveReceiptOrder] = useState(null);
  const [showQrFlyer, setShowQrFlyer] = useState(false);

  // Dynamic Outlet Switcher Handler
  const handleOutletChange = (outletName) => {
    setActiveOutlet(outletName);
    if (STORE_MENUS_MAP[outletName]) {
      setDishes(STORE_MENUS_MAP[outletName]);
    }
  };

  // Flow Navigation Handlers
  const handleLaunchLogin = () => {
    setPageState('login');
  };

  const handleLaunchGuestQr = (tableName = 'Table 04') => {
    setSelectedTable(tableName);
    const guestUser = {
      id: 'user-guest',
      name: 'Guest Customer',
      email: 'guest@table.com',
      role: 'guest',
      initialView: 'guest'
    };
    setCurrentUser(guestUser);
    setActiveView('guest');
    setPageState('app');
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    
    // Strict 1:1 view isolation upon login
    let defaultView = 'admin';
    if (user.role === 'kitchen') defaultView = 'kitchen';
    else if (user.role === 'counter') defaultView = 'counter';
    else if (user.role === 'waiter') defaultView = 'waiter';
    else if (user.role === 'manager') defaultView = 'customers';
    else if (user.role === 'guest') defaultView = 'guest';

    setActiveView(user.initialView || defaultView);
    setPageState('app');
  };

  const handleLogout = () => {
    setPageState('landing');
  };

  // FLOW STEP 1: PUBLIC LANDING PAGE (Initial Page Load)
  if (pageState === 'landing') {
    return (
      <LandingPage
        onLaunchLogin={handleLaunchLogin}
        onLaunchGuestQr={handleLaunchGuestQr}
      />
    );
  }

  // FLOW STEP 2: AUTHENTICATION / LOGIN PORTAL
  if (pageState === 'login') {
    return (
      <AuthPortal
        onLoginSuccess={handleLoginSuccess}
        onGuestSelect={handleLaunchGuestQr}
      />
    );
  }

  const role = currentUser ? currentUser.role : 'admin';

  // FLOW STEP 3: ISOLATED WORKSPACE APP PER ROLE
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', background: 'var(--bg-dark)' }}>
      
      {/* 100% Isolated Navigation Sidebar */}
      <SidebarNav
        activeView={activeView}
        setActiveView={setActiveView}
        activeOutlet={activeOutlet}
        setActiveOutlet={handleOutletChange}
        outlets={INITIAL_OUTLETS}
        orders={orders}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflow: 'hidden' }}>
        
        {/* Isolated Top Operational Header Bar */}
        <header style={{
          background: 'rgba(10, 13, 20, 0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          padding: '0.85rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 300,
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {/* Active Persona Header Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span style={{ fontSize: '1.4rem' }}>
              {role === 'kitchen' ? '🍳' : role === 'counter' ? '💳' : role === 'waiter' ? 'RB' : role === 'manager' ? '👥' : role === 'guest' ? '📱' : activeWorkspace.logo}
            </span>
            <div>
              <div style={{ fontSize: '0.95rem', color: '#fff', fontWeight: '800', lineHeight: 1.1 }}>
                {role === 'kitchen' ? 'Kitchen Display System (KDS Station Tickets)' :
                 role === 'counter' ? 'Counter POS & Billing Desk' :
                 role === 'waiter' ? 'Waiter Floorplan Operations' :
                 role === 'manager' ? 'Guest CRM & Table Bookings Desk' :
                 role === 'guest' ? 'Tableline Mobile QR Menu' :
                 activeWorkspace.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {activeOutlet} • <span style={{ color: 'var(--primary)', fontWeight: '700' }}>ISOLATED {role.toUpperCase()} SESSION</span>
              </div>
            </div>
          </div>

          {/* ISOLATED TOP HEADER BUTTONS (Strictly Scoped) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {role === 'admin' && (
              <>
                <button onClick={() => setShowQrFlyer(true)} className="btn btn-outline btn-sm">
                  🖨️ Table QR Tent Cards
                </button>
                <button onClick={() => setActiveView('workspace_saas')} className="btn btn-secondary btn-sm">
                  🏢 SaaS Workspaces
                </button>
              </>
            )}

            {/* Logout button always returns user cleanly to Landing Page */}
            <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ borderColor: 'rgba(244,63,94,0.4)', color: '#fda4af' }}>
              🚪 Sign Out To Landing Page ({role.toUpperCase()})
            </button>
          </div>
        </header>

        {/* Dynamic Pure Isolated View Rendering */}
        <main style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto', overflowX: 'hidden' }}>
          
          {/* 🍳 KITCHEN CHEF ROLE: ONLY KitchenPortal */}
          {role === 'kitchen' && (
            <KitchenPortal
              orders={orders}
              setOrders={setOrders}
            />
          )}

          {/* 💳 CASHIER POS ROLE: ONLY CounterPortal */}
          {role === 'counter' && (
            <CounterPortal
              dishes={dishes}
              orders={orders}
              setOrders={setOrders}
              auditLogs={auditLogs}
              setAuditLogs={setAuditLogs}
              onOpenReceipt={(order) => setActiveReceiptOrder(order)}
            />
          )}

          {/* 🛎️ WAITER FLOOR ROLE: ONLY WaiterPortal */}
          {role === 'waiter' && (
            <WaiterPortal
              tables={tables}
              orders={orders}
              setOrders={setOrders}
              onOpenReceipt={(order) => setActiveReceiptOrder(order)}
            />
          )}

          {/* 👥 GUEST CRM MANAGER ROLE: CustomerCrmPortal OR ReservationCrmPortal */}
          {role === 'manager' && (
            <div>
              {activeView === 'customers' && (
                <CustomerCrmPortal
                  customers={customers}
                  setCustomers={setCustomers}
                />
              )}
              {activeView === 'reservations' && (
                <ReservationCrmPortal
                  reservations={reservations}
                  setReservations={setReservations}
                  tables={tables}
                />
              )}
            </div>
          )}

          {/* 📱 GUEST MOBILE QR ROLE: ONLY GuestPortal */}
          {role === 'guest' && (
            <GuestPortal
              dishes={dishes}
              orders={orders}
              setOrders={setOrders}
              selectedTable={selectedTable}
              setSelectedTable={setSelectedTable}
              onOpenReceipt={(order) => setActiveReceiptOrder(order)}
            />
          )}

          {/* 👑 ADMIN & SUPER ADMIN ROLES */}
          {(role === 'admin' || role === 'super_admin') && (
            <div>
              {activeView === 'workspace_saas' && (
                <SaasWorkspacePortal
                  workspaces={workspaces}
                  setWorkspaces={setWorkspaces}
                  activeWorkspace={activeWorkspace}
                  setActiveWorkspace={setActiveWorkspace}
                  teamMembers={teamMembers}
                  setTeamMembers={setTeamMembers}
                />
              )}

              {activeView === 'store_onboard' && (
                <StoreOnboardingPortal
                  outlets={INITIAL_OUTLETS}
                  setOutlets={(updated) => console.log('Outlets updated')}
                  onCompleteOnboarding={(newStore) => {
                    handleOutletChange(newStore.name);
                    setActiveView('admin');
                  }}
                />
              )}

              {activeView === 'menu_manage' && (
                <AddDishPortal
                  dishes={dishes}
                  setDishes={setDishes}
                />
              )}

              {activeView === 'floor_builder' && (
                <FreeCanvasFloorplanBuilder
                  tables={tables}
                  setTables={setTables}
                />
              )}

              {activeView === 'suppliers' && (
                <SuppliersPortal
                  inventory={inventory}
                  setInventory={setInventory}
                />
              )}

              {activeView === 'reports' && (
                <FinancialReportsPortal
                  orders={orders}
                  activeOutlet={activeOutlet}
                />
              )}

              {activeView === 'admin' && (
                <ManagerPortal
                  dishes={dishes}
                  setDishes={setDishes}
                  orders={orders}
                  inventory={inventory}
                  setInventory={setInventory}
                  auditLogs={auditLogs}
                  scratchRewards={SCRATCH_REWARDS}
                />
              )}

              {activeView === 'customers' && (
                <CustomerCrmPortal
                  customers={customers}
                  setCustomers={setCustomers}
                />
              )}

              {activeView === 'reservations' && (
                <ReservationCrmPortal
                  reservations={reservations}
                  setReservations={setReservations}
                  tables={tables}
                />
              )}

              {activeView === 'guest' && (
                <GuestPortal
                  dishes={dishes}
                  orders={orders}
                  setOrders={setOrders}
                  selectedTable={selectedTable}
                  setSelectedTable={setSelectedTable}
                  onOpenReceipt={(order) => setActiveReceiptOrder(order)}
                />
              )}

              {activeView === 'waiter' && (
                <WaiterPortal
                  tables={tables}
                  orders={orders}
                  setOrders={setOrders}
                  onOpenReceipt={(order) => setActiveReceiptOrder(order)}
                />
              )}

              {activeView === 'kitchen' && (
                <KitchenPortal
                  orders={orders}
                  setOrders={setOrders}
                />
              )}

              {activeView === 'counter' && (
                <CounterPortal
                  dishes={dishes}
                  orders={orders}
                  setOrders={setOrders}
                  auditLogs={auditLogs}
                  setAuditLogs={setAuditLogs}
                  onOpenReceipt={(order) => setActiveReceiptOrder(order)}
                />
              )}
            </div>
          )}

        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '1.2rem',
          background: 'rgba(10, 13, 20, 0.95)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          color: 'var(--text-muted)',
          fontSize: '0.8rem'
        }}>
          Global Scale Softwares • Multi-Tenant SaaS Workspace Engine
        </footer>
      </div>

      {/* Thermal / Digital Bill Receipt Modal */}
      {activeReceiptOrder && (
        <ReceiptModal
          order={activeReceiptOrder}
          onClose={() => setActiveReceiptOrder(null)}
        />
      )}

      {/* Table Tent Card QR Flyer Generator */}
      {showQrFlyer && (
        <QrFlyerModal
          selectedTable={selectedTable}
          onClose={() => setShowQrFlyer(false)}
        />
      )}

    </div>
  );
}
