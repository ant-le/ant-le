<script lang="ts">
	interface WeeklyData {
		week: string;
		totalDistance: number;
	}

	let { weeklyData } = $props<{ weeklyData: WeeklyData[] }>();

	// Chart dimensions
	const width = 300;
	const height = 200;
	const padding = 40;

	// Calculate scales
	const maxDistance = Math.max(...weeklyData.map((d: WeeklyData) => d.totalDistance));
	const xScale = (width - 2 * padding) / (weeklyData.length - 1);
	const yScale = (height - 2 * padding) / maxDistance;

	// Generate path for the line
	let pathData = $state('');
	weeklyData.forEach((data: WeeklyData, index: number) => {
		const x = padding + index * xScale;
		const y = height - padding - (data.totalDistance * yScale);
		
		if (index === 0) {
			pathData += `M ${x} ${y}`;
		} else {
			pathData += ` L ${x} ${y}`;
		}
	});

	// Generate points for the dots
	const points = weeklyData.map((data: WeeklyData, index: number) => {
		const x = padding + index * xScale;
		const y = height - padding - (data.totalDistance * yScale);
		return { x, y, distance: data.totalDistance };
	});
</script>

<div class="card">
	<h3 class="heading-3">
		Weekly Training Progress
	</h3>
	
	<div class="relative">
		<svg width={width} height={height} class="w-full">
			<!-- Grid lines -->
			{#each Array.from({ length: 5 }) as _, i}
				{@const y = padding + (i * (height - 2 * padding) / 4)}
				<line 
					x1={padding} 
					y1={y} 
					x2={width - padding} 
					y2={y} 
					stroke="var(--color-neutral-200)" 
					stroke-width="1"
				/>
				<text 
					x={padding - 10} 
					y={y + 4} 
					text-anchor="end" 
					font-size="12" 
					fill="var(--color-text-tertiary)"
				>
					{(maxDistance * (4 - i) / 4).toFixed(0)}km
				</text>
			{/each}

			<!-- Week labels -->
			{#each weeklyData as data, index}
				{@const x = padding + index * xScale}
				<text 
					x={x} 
					y={height - 10} 
					text-anchor="middle" 
					font-size="10" 
					fill="var(--color-text-tertiary)"
				>
					{new Date(data.week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
				</text>
			{/each}

			<!-- Line chart -->
			<path 
				d={pathData} 
				stroke="var(--color-primary)" 
				stroke-width="2" 
				fill="none" 
				stroke-linecap="round" 
				stroke-linejoin="round"
			/>

			<!-- Data points -->
			{#each points as point}
				<circle 
					cx={point.x} 
					cy={point.y} 
					r="4" 
					fill="var(--color-bg-primary)" 
					stroke="var(--color-primary)" 
					stroke-width="2"
				/>
			{/each}
		</svg>
	</div>

	<!-- Summary stats -->
	<div class="mt-4 grid grid-cols-2 gap-4">
		<div class="summary-stat">
			<div class="summary-value">
				{weeklyData.reduce((sum: number, week: WeeklyData) => sum + week.totalDistance, 0).toFixed(1)}km
			</div>
			<div class="text-caption">Total</div>
		</div>
		<div class="summary-stat">
			<div class="summary-value">
				{(weeklyData.reduce((sum: number, week: WeeklyData) => sum + week.totalDistance, 0) / weeklyData.length).toFixed(1)}km
			</div>
			<div class="text-caption">Average</div>
		</div>
	</div>

<style>
	.summary-stat {
		text-align: center;
		padding: 0.75rem;
		background-color: var(--color-bg-tertiary);
		border-radius: 0.5rem;
		border: 1px solid var(--color-neutral-200);
		transition: all 0.3s ease;
	}

	.summary-value {
		font-weight: 700;
		color: var(--color-primary);
	}
</style>
</div>
