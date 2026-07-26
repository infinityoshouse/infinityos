import {
  dashboardCards,
  quickActions,
  recentActivities,
} from "../data/dashboard.data";

class DashboardService {
  getCards() {
    return dashboardCards;
  }

  getQuickActions() {
    return quickActions;
  }

  getRecentActivities() {
    return recentActivities;
  }
}

export const dashboardService = new DashboardService();
